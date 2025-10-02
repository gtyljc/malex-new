"use client";

import { 
    Admin, 
    Resource, 
    ListGuesser, 
    EditGuesser
} from "react-admin";

import simpleRestProvider from "ra-data-simple-rest";


const dataProvider = simpleRestProvider(process.env.ADMIN_API_URL);

export default function AdminApp(){
    return(
        <Admin dataProvider={dataProvider}>
            <Resource name="appointments" list={ListGuesser} />
        </Admin>
    );
}