"use server";

import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { AppointmentQueries } from "@src/server-requests";

dayjs.extend(objectSupport)

// main form receiver
export async function createAppointment(formData){
    const dateField = dayjs(formData.get("time"));
    
    // send request to API
    return await global.apolloClient.mutate(
        {
            mutation: AppointmentQueries.create(),
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
}