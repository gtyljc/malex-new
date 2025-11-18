"use server";

import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { CREATE_QUERY } from "@src/api-requests";

dayjs.extend(objectSupport)

// main form receiver
export async function createAppointment(formData){
    const dateField = dayjs(formData.get("time"));
    
    // send request to API
    const r = await global.gqlClient.mutate(
        {
            mutation: CREATE_QUERY("appointment"),
            variables: {
                data: {
                    name: formData.get("name"),
                    surname: formData.get("surname"),
                    address: formData.get("address"),
                    job_desc: formData.get("job_desc"),
                    bwt: formData.get("bwt").toUpperCase(),
                    number: formData.get("number"),
                    date: dayjs(
                        formData.get("date")).add(
                            {
                                h: dateField.hour(), 
                                m: dateField.minute() 
                            }
                    ).toISOString()
                }
            } 
        }
    );

    console.log(r.errors)
}