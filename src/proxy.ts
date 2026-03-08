
import { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { dayjs } from "@lib/dayjs/server";
import { NextResponse } from "next/server";
import { createRT } from "@src/lib/auth";
import { env } from "@src/lib/tools";
import * as types from "@lib/types";

interface RedirectWithNewPairOptions {
    userId: string, 
    role: types.Role
}

async function redirectWithNewPair(
    request: NextRequest, 
    { userId, role }: RedirectWithNewPairOptions
): Promise<NextResponse>{
    const newPair = await createRT({ role, userId });

    if(!newPair.success){
        return new NextResponse(null, { status: 500 });
    }

    console.log("wl[d[lwd[ld")
    
    const response = NextResponse.next();
    const newRT = newPair.data[0].rt;
    const newRTClaims = decodeJwt(newRT);
    const newAT = newPair.data[0].at;
    const newATClaims = decodeJwt(newAT);

    response.cookies.set(
        "r_token", 
        newRT,
        {
            httpOnly: true,
            secure: env("NODE_ENV") == "development" ? false: true,
            domain: env("API_HOST"),
            maxAge: newRTClaims.exp - newRTClaims.iat
        }
    )

    response.cookies.set(
        "a_token", 
        newAT,
        {
            httpOnly: true,
            secure: env("NODE_ENV") == "development" ? false: true,
            domain: env("API_HOST"),
            maxAge: newATClaims.exp - newATClaims.iat
        }
    )

    return response;
}

// start point of site
export default async function proxy(request: NextRequest): Promise<NextResponse> {
    let rt = request.cookies.get("r_token");

    // user is absolutly new or his RT is expired
    if (rt === undefined || decodeJwt(rt.value).exp <= dayjs().unix()){
        return await redirectWithNewPair(
            request, 
            { userId: null, role: "GUEST" }
        );
    }

    const rtClaims = decodeJwt(rt.value);

    // is expired or not
    if (rtClaims.exp < dayjs().unix()){
        return await redirectWithNewPair(
            request, 
            { userId: rtClaims.sub, role: rtClaims.aud as types.Role }
        );
    }

    return NextResponse.next();
}