"use client";

// others
import { Admin, Resource, Login } from "react-admin";
import DataProvider from "./data-provider";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// components
import AppointmentsList from "@admin/appointment-list/component";
import AppointmentsEdit from "@admin/appointment-edit/component";
import WorksList from "@admin/work-list/component";
import WorksCreate from "@admin/work-create/component";
import WorksEdit from "@admin/work-edit/components";

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

const FIELDS_SCHEMA = {
    work: WORK_FIELDS,
    appointment: APPOINTMENT_FIELDS
}

const gql_client = new ApolloClient(
    {
        link: new HttpLink({uri: "http://localhost:2000"}),
        cache: new InMemoryCache()
    }
)

export default function AdminApp(){
    return(
        <Admin dataProvider={ new DataProvider(gql_client, FIELDS_SCHEMA) }>
            <Resource name="appointment" list={ AppointmentsList } edit={ AppointmentsEdit } />
            <Resource name="work" list={ WorksList } create={ WorksCreate } edit={ WorksEdit } />
        </Admin>
    );
}