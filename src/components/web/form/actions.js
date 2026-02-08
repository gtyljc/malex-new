"use server";

import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { AppointmentQueries } from "@src/apollo-clients/queries/backend";
import { createAppointmentSchema } from "./validation-schemas";

dayjs.extend(objectSupport)

// main form receiver
export async function createAppointment(formData){
    const data = Object.fromEntries(formData.entries());

    if(createAppointmentSchema.safeParse(data)){

        // create appointment
        await global.apolloClient.mutate(
            {
                mutation: AppointmentQueries.create(),
                variables: { data } 
            }
        );
    }
}