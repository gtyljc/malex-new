"use client";

// others
import { Admin, Resource, Login } from "react-admin";
import DataProvider from "./data-provider";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
 import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";

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
    "img_url",
    "img_id",
    "category",
    "timestamp"
]

const FIELDS_SCHEMA = {
    work: WORK_FIELDS,
    appointment: APPOINTMENT_FIELDS
}

const removeTypenameLink = new RemoveTypenameFromVariablesLink();
const httpLink = new HttpLink({ uri: "http://localhost:2000" });
const link = ApolloLink.from([ removeTypenameLink, httpLink ]);

const gqlClient = new ApolloClient(
    {
        link,
        cache: new InMemoryCache()
    }
)

export default function AdminApp(){
    return(
        <Admin dataProvider={ new DataProvider(gqlClient, FIELDS_SCHEMA) }>
            <Resource name="appointment" list={ AppointmentsList } edit={ AppointmentsEdit } />
            <Resource name="work" list={ WorksList } create={ WorksCreate } edit={ WorksEdit } />
        </Admin>
    );
}