
import { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { dayjs } from "@lib/dayjs/server";
import { NextResponse } from "next/server";
import { createRT, createAT } from "@src/lib/auth";
import { env } from "@src/lib/tools";
import * as types from "@lib/types";

async function redirectWithNewPair(request: NextRequest, tokens: types.TokensType): Promise<NextResponse> {
    const response = NextResponse.redirect(new URL(request.url));
    const newRTClaims = decodeJwt(tokens.rt);
    const newATClaims = decodeJwt(tokens.at);

    response.cookies.set(
        "a_token",
        tokens.at,
        {
            httpOnly: true,
            secure: env("NODE_ENV") == "development" ? false : true,
            domain: env("API_HOST"),
            maxAge: newATClaims.exp - newATClaims.iat
        }
    )

    response.cookies.set(
        "r_token",
        tokens.rt,
        {
            httpOnly: true,
            secure: env("NODE_ENV") == "development" ? false : true,
            domain: env("API_HOST"),
            maxAge: newRTClaims.exp - newRTClaims.iat
        }
    )

    return response;
}

export const config = {
    matcher: [
        
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}

export default async function proxy(request: NextRequest): Promise<NextResponse> {
    const rt = request.cookies.get("r_token");
    const at = request.cookies.get("a_token");

    // user is absolutly new or guest
    if (rt === undefined || at === undefined) {
        const r = await createRT({ role: types.RoleEnum.Guest });

        if (!r.success) return new NextResponse(null, { status: 500 });

        return await redirectWithNewPair(request, r.data[0]);
    }

    const atClaims = decodeJwt(at.value);

    // at is expired or not
    if (atClaims.exp < dayjs().unix()){
        const r = await createAT(rt.value);

        if (!r.success) return new NextResponse(null, { status: 500 });

        return await redirectWithNewPair(request, r.data[0]);
    }

    const rtClaims = decodeJwt(rt.value);

    // rt is expired and return 
    if (rtClaims.exp < dayjs().unix()) {
        const rtClaims = decodeJwt(rt.value);
        const r = await createRT({ role: rtClaims.aud as types.RoleEnum, userId: rtClaims.sub });

        if (!r.success) return new NextResponse(null, { status: 500 });

        return await redirectWithNewPair(request, r.data[0]);
    }

    return NextResponse.next();
}