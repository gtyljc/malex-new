"use server";

// db
import prisma from "@lib/prisma";
import { json } from "zod";


// export const dynamic = "force-dynamic";

export async function POST(request, params) {
    const url = URL.parse(request.url);

    console.log("sosi");

    return Response.json(
        {
            sosi: "100%"
        }
    )
}
