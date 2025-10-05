
import Methods from "@app/api/admin/methods";
import { runMethod } from "@app/api/admin/methods";
import CloudflareImages from "@app/api/cloudflare-images";
import prisma from "@db/prisma-client";


const m = new WorksMethods("Work"); // uses Work model

export async function POST(request) {
    return await runMethod(request, m)
}