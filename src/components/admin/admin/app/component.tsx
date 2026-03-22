
// others
import { Admin, Resource, CustomRoutes, memoryStore } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { useClientAC } from "@src/lib/apollo-clients/client";
import { ApolloLink } from "@apollo/client";
import * as types from "@lib/types";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";
import { ApolloProvider } from "@apollo/client/react";

export default function AdminApp(){
    const { isInitialized, link, client } = useClientAC();

    if (!isInitialized) return null;

    // add link to remove typenames
    client.setLink(ApolloLink.from([ new RemoveTypenameFromVariablesLink(), link ]));

    return(
        <ApolloProvider client={ client }>
            <Admin 
                dataProvider={ new DataProvider(client) }
                authProvider={ new AuthProvider(client) }
                layout={ CustomLayout }
                requireAuth
                store={ memoryStore() }
            >
                <Resource 
                    name={ types.ResourceEnum.Appointment } 
                    list={ AppointmentList } 
                    edit={ AppointmentEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ types.ResourceEnum.Work } 
                    list={ WorkList } 
                    create={ WorkCreate } 
                    edit={ WorkEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ types.ResourceEnum.SiteConfig } 
                    edit={ SiteConfigEdit } 
                    show={ SiteConfigShow }
                    recordRepresentation={ (record) => "Site Config" }
                />
                <CustomRoutes>
                    <Route 
                        path={ `/${ types.ResourceEnum.SiteConfig }` } 
                        element={ <SiteConfigShow /> } 
                    />
                </CustomRoutes>
            </Admin>
        </ApolloProvider>
    );
}