
// others
import { Admin, Resource, CustomRoutes, memoryStore } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { AppointmentQueries, WorkQueries, SiteConfigQueries } from "@src/lib/apollo-clients/queries/server";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { frontendClient } from "@src/lib/apollo-clients/client";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";
import { ApolloProvider } from "@apollo/client/react";

export default function AdminApp(){

    // add link to remove typenames
    frontendClient.client.setLink(
        new RemoveTypenameFromVariablesLink()
            .concat(frontendClient.link)
    );

    return(
        <ApolloProvider client={ frontendClient }>
            <Admin 
                dataProvider={
                    new DataProvider(
                        client,
                        {
                            [ AppointmentQueries.resource ]: new AppointmentQueries(),
                            [ WorkQueries.resource ]: new WorkQueries(),
                            [ SiteConfigQueries.resource ]: new SiteConfigQueries()
                        }
                    )
                }
                authProvider={ new AuthProvider(frontendClient) }
                layout={ CustomLayout }
                requireAuth
                store={ memoryStore() }
            >
                <Resource 
                    name={ AppointmentQueries.resource } 
                    list={ AppointmentList } 
                    edit={ AppointmentEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ WorkQueries.resource } 
                    list={ WorkList } 
                    create={ WorkCreate } 
                    edit={ WorkEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ SiteConfigQueries.resource } 
                    edit={ SiteConfigEdit } 
                    show={ SiteConfigShow }
                    recordRepresentation={ (record) => "Site Config" }
                />
                <CustomRoutes>
                    <Route 
                        path={ `/${SiteConfigQueries.resource}` } 
                        element={ <SiteConfigShow /> } 
                    />
                </CustomRoutes>
            </Admin>
        </ApolloProvider>
    );
}