
import * as z from "zod";

const enRegex = /^[A-Za-z]+$/;
const phoneRegex = /^(?:\+[1-9][0-9]{7,14}|[0-9]{10})$/;
const onlyDecimalRegex = /[^\d+]/g;
const schema = {
    name: z.string().min(1).max(50).regex(enRegex),
    surname: z.string().min(1).max(50).regex(enRegex),
    address: z.string().min(1).max(255),
    job_desc: z.string().min(1).max(500),
    bwt: z.enum(["WHATSAPP", "TEXT", "PHONE"]),
    phone_number: z.string().transform(v => v.replace(onlyDecimalRegex, "")).refine(v => phoneRegex.test(v)),
}

export const clientDataStepSchema = z.object(schema);

export const createAppointmentSchema = z.object({ ...schema, date: z.iso.datetime() });