
// others
import { Admin, Resource, CustomRoutes, memoryStore } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import * as serverQueries from "@src/lib/apollo-clients/queries/server";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { clientAC } from "@src/lib/apollo-clients/client";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";
import { ApolloProvider } from "@apollo/client/react";

export default function AdminApp(){

    // add link to remove typenames
    clientAC.client.setLink(
        new RemoveTypenameFromVariablesLink()
            .concat(clientAC.link)
    );

    return(
        <ApolloProvider client={ clientAC.client }>
            <Admin 
                dataProvider={
                    new DataProvider(
                        clientAC.client,
                        {
                            [ serverQueries.AppointmentQueries.resourceName ]: serverQueries.AppointmentQueries,
                            [ serverQueries.WorkQueries.resourceName ]: serverQueries.WorkQueries,
                            [ serverQueries.SiteConfigQueries.resourceName ]: serverQueries.SiteConfigQueries
                        }
                    )
                }
                authProvider={ new AuthProvider(clientAC.client) }
                layout={ CustomLayout }
                requireAuth
                store={ memoryStore() }
            >
                <Resource 
                    name={ serverQueries.AppointmentQueries.resourceName } 
                    list={ AppointmentList } 
                    edit={ AppointmentEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ serverQueries.WorkQueries.resourceName } 
                    list={ WorkList } 
                    create={ WorkCreate } 
                    edit={ WorkEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ serverQueries.SiteConfigQueries.resourceName } 
                    edit={ SiteConfigEdit } 
                    show={ SiteConfigShow }
                    recordRepresentation={ (record) => "Site Config" }
                />
                <CustomRoutes>
                    <Route 
                        path={ `/${ serverQueries.SiteConfigQueries.resourceName }` } 
                        element={ <SiteConfigShow /> } 
                    />
                </CustomRoutes>
            </Admin>
        </ApolloProvider>
    );
}