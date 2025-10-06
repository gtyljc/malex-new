
import { runMethod, Methods } from "@app/api/admin/methods";


const m = new Methods("Appointment"); // uses Appointment model

export async function POST(request) {
    return await runMethod(request, m)
}