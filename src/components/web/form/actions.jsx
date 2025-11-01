"use server";

import { gql } from "@apollo/client";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport)

const CREATE_APPOINTMENT_QUERY = gql`
    mutation CreateAppointment($data: AppointmentCreateInput!) {
        createAppointment(data: $data) {
            code,
            success,
            message,
            data {
               id
            }
        }
    }
`;

// main form receiver
export async function createAppointment(formData){
    const dateField = dayjs(formData.get("time"));
    
    // send request to API
    await global.gql_client.mutate(
        {
            mutation: CREATE_APPOINTMENT_QUERY,
            variables: {
                data: {
                    name: formData.get("name"),
                    surname: formData.get("surname"),
                    address: formData.get("address"),
                    job_desc: formData.get("job_desc"),
                    bwt: formData.get("bwt").toUpperCase(),
                    number: formData.get("number"),
                    date: dayjs(
                        formData.get("date")).add({h: dateField.hour(), m: dateField.minute()}
                    ).toISOString()
                }
            } 
        }
    );
}