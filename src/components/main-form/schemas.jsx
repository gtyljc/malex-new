
import * as z from "zod";

// regexs
const enRegex = /^[A-Za-z]+$/;
const phoneRegex = /^(?:\+[1-9][0-9]{7,14}|[0-9]{10})$/;
const onlyDecimalRegex = /[^\d+]/g;

export const MainFormSchema = z.object(
    {
        name: z.string().min(1).max(50).regex(enRegex),
        surname: z.string().min(1).max(50).regex(enRegex),
        address: z.string().min(1).max(255),
        job_desc: z.string().min(1).max(500),
        bwt: z.enum(["whatsapp", "text", "phone"]),
        number: z.string().transform(v => v.replace(onlyDecimalRegex, "")).refine(v => phoneRegex.test(v)),
        date: z.date()
    }
);