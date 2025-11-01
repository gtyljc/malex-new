"use client";

// others
import { Admin, Resource, Login } from "react-admin";
import DataProvider from "./data-provider";
import {
    googleAuthProvider,
    LoginButton
} from "ra-auth-google";

// components

// appointments
import AppointmentsList from "@admin/appointment-list/component";
import AppointmentsEdit from "@admin/appointment-edit/component";

// works
import WorksList from "@admin/work-list/component";
import WorksCreate from "@admin/work-create/component";
import WorksEdit from "@admin/work-edit/components";

// removes element and returns new array
function patch(array, ...args){
    return array.filter(e => !args.includes(e));
}

const APPOINTMENT_FIELDS = [
    "id",
    "name",
    "surname",
    "address",
    "job_desc",
    "bwt",
    "number",
    "date",
    "duration"
]

const WORK_FIELDS = [
    "id",
    "img_urls",
    "img_id",
    "category"
]

const RESOURCES = {
    appointment: {
        create: patch(
            APPOINTMENT_FIELDS,
            "id",
            "duration"
        ),
        read: APPOINTMENT_FIELDS,
        update: patch(
            APPOINTMENT_FIELDS, 
            "id", 
            "name",
            "surname",
            "address",
            "job_desc",
            "bwt",
            "number", 
            "date",
        ),
        delete: APPOINTMENT_FIELDS
    },
    work: {
        create: patch(WORK_FIELDS, "id"),
        read: WORK_FIELDS,
        update: patch(WORK_FIELDS, "id"),
        delete: WORK_FIELDS
    }
}



export default function AdminApp(){
    return(
        <Admin dataProvider={new DataProvider(global.gql_client, RESOURCES)}>
            <Resource name="appointment" list={AppointmentsList} edit={AppointmentsEdit} />
            <Resource name="work" list={WorksList} create={WorksCreate} edit={WorksEdit} />
        </Admin>
    );
}