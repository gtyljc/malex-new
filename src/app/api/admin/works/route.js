
import { runMethod, MethodsWithImageSupport } from "@app/api/admin/methods";


const m = new MethodsWithImageSupport("Work"); // uses Work model

export async function POST(request) {
    return await runMethod(request, m);
}