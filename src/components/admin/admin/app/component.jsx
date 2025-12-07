
// others
import { Admin, Resource, Login, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { AppointmentQueries, WorkQueries, AdminConfigQueries } from "@src/server-requests";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { AdminConfigShow, AdminConfigEdit } from "@admin/admin-config/component";
import CustomLayout from "@admin/custom-layout/component";

const removeTypenameLink = new RemoveTypenameFromVariablesLink();
const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });
const link = ApolloLink.from([ removeTypenameLink, httpLink ]);

export default function AdminApp(){
    return(
        <Admin 
            dataProvider={ 
                new DataProvider(
                    new ApolloClient(
                        { link, cache: new InMemoryCache() }
                    ), 
                    {

                        // add interface to work with GraphQL queries
                        [ AppointmentQueries.resource ]: AppointmentQueries,
                        [ WorkQueries.resource ]: WorkQueries,
                        [ AdminConfigQueries.resource ]: AdminConfigQueries
                    }
                ) 
            } 
            layout={ CustomLayout }
        >
            <Resource name="appointment" list={ AppointmentList } edit={ AppointmentEdit } />
            <Resource name="work" list={ WorkList } create={ WorkCreate } edit={ WorkEdit } />
            <Resource name="adminConfig" edit={ AdminConfigEdit } show={ AdminConfigShow } />

            <CustomRoutes>
                <Route path="/admin-config" element={ <AdminConfigShow /> } />
            </CustomRoutes>
        </Admin>
    );
}