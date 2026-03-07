
import { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { dayjs } from "@lib/dayjs";
import { NextResponse } from "next/server";
import { createRT } from "@src/lib/auth";
import { env } from "@src/lib/tools";
import * as types from "@lib/types";

async function redirectWithNewPair(
    request: NextRequest, 
    { userId, role }: { userId: string, role: types.Role }
): Promise<NextResponse>{
    const headers = new Headers(request.headers);
    const newPair = await createRT({ role, userId });

    if(!newPair.success){
        return new NextResponse(null, { status: 500 });
    }

    const response = NextResponse.redirect(request.nextUrl.pathname, { headers });
    const newRT = newPair.data[0].rt;
    const newRTClaims = decodeJwt(newRT);
    const newAT = newPair.data[0].at;
    const newATClaims = decodeJwt(newAT);

    response.cookies.set(
        "r_token", 
        newRT,
        {
            httpOnly: true,
            secure: false, // change it in development
            domain: env("API_HOST"),
            maxAge: newRTClaims.exp - newRTClaims.iat
        }
    )

    response.cookies.set(
        "a_token", 
        newAT,
        {
            httpOnly: true,
            secure: false, // change it in development
            domain: env("API_HOST"),
            maxAge: newATClaims.exp - newATClaims.iat
        }
    )

    return response;
}

// start point of site
export async function proxy(request: NextRequest): Promise<NextResponse> {
    const rt = request.cookies.get("r_token").value;

    // user is guest
    if (rt === undefined){
        return await redirectWithNewPair(request, { userId: null, role: "GUEST" });
    }

    const rtClaims = decodeJwt(rt);

    // is expired or not
    if (rtClaims.exp < dayjs().unix()){
        return await redirectWithNewPair(request, { userId: rtClaims.sub, role: rtClaims.aud as types.Role });
    }

    return NextResponse.next();
}
