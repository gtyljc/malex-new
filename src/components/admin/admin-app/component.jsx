"use client";

// tools
import { Admin, Resource } from "react-admin";
import DataProvider from "./data-provider";

// components

// appointments
import AppointmentsList from "@admin/appointments-list/component";
import AppointmentsEdit from "@admin/appointments-edit/component";

// works
import WorksList from "@admin/works-list/component";
import WorksCreate from "@admin/works-create/component";
import WorksEdit from "@admin/works-edit/components";

export default function AdminApp(){
    return(
        <Admin dataProvider={new DataProvider(process.env.NEXT_PUBLIC_ADMIN_API_URL)}>
            <Resource name="appointments" list={AppointmentsList} edit={AppointmentsEdit} />
            <Resource name="works" list={WorksList} create={WorksCreate} edit={WorksEdit} />
        </Admin>
    );
}