
import { env } from "./tools"; 
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import crypto, { BinaryToTextEncoding } from "node:crypto";
import * as types from "./types";

async function hashRaw(raw: string){
    const encoder = new TextEncoder();
    const data = encoder.encode(raw);
    const buffer = new Uint8Array(
        await crypto.subtle.digest(env("RT_CREATE_REQUEST_HASH_FUNC"), data)
    );

    // hash
    return Buffer.from(buffer).toString(env("RT_CREATE_REQUEST_ENCODING") as BufferEncoding);
}

function stableStringify(value: Record<any, any>): string {
    if (value === null || typeof value !== "object") {
        return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
        return "[" + value.map(stableStringify).join(",") + "]";
    }

    const keys = Object.keys(value).sort();

    return "{" + keys.map(
        (k: string) => JSON.stringify(k) + ":" + stableStringify(value[k])
    ).join(",") + "}";
}

export async function createRT(
    { userId, role }: 
    { userId: string, role: types.Role }
): Promise<types.APIResponse<{ rt: string, at: string }>> {
    const body = { userId, role };
    const hashedBody = await hashRaw(stableStringify(body));
    const path = "/rt/create";
    const method = "POST";
    const timestamp = dayjs().unix();
    const nonce = nanoid(16);
    const stringToSign = method + path + timestamp.toString() + nonce + hashedBody;
    const signature = crypto.createHmac(env("RT_CREATE_REQUEST_ENCODING"), env("RT_CREATE_REQUEST_SECRET"))
        .update(stringToSign)
        .digest(env("RT_CREATE_REQUEST_ENCODING") as BinaryToTextEncoding);
    const headers = {
        "X-Timestamp": timestamp.toString(),
        "X-Nonce": nonce,
        "X-Signature": signature,
        "X-Body-Hash": hashedBody,
        "Content-Type": "application/json"
    };

    return await (
        await fetch(
            process.env.NEXT_PUBLIC_API_URL + path,
            {
                method,
                headers,
                body: stableStringify(body)
            }
        )
    ).json();
}