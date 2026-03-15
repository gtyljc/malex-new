
// others
import { Admin, Resource, CustomRoutes, memoryStore } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import * as queries from "@src/lib/apollo-clients/queries/admin";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { useClientAC } from "@src/lib/apollo-clients/client";
import { ApolloLink } from "@apollo/client";

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
                dataProvider={
                    new DataProvider(
                        client,
                        {
                            [ queries.AppointmentQueries.resourceName ]: new queries.AppointmentQueries(),
                            [ queries.WorkQueries.resourceName ]: new queries.WorkQueries(),
                            [ queries.SiteConfigQueries.resourceName ]: new queries.SiteConfigQueries()
                        }
                    )
                }
                authProvider={ new AuthProvider(client) }
                layout={ CustomLayout }
                requireAuth
                store={ memoryStore() }
            >
                <Resource 
                    name={ queries.AppointmentQueries.resourceName } 
                    list={ AppointmentList } 
                    edit={ AppointmentEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ queries.WorkQueries.resourceName } 
                    list={ WorkList } 
                    create={ WorkCreate } 
                    edit={ WorkEdit }
                    recordRepresentation={ (record) => `ID: ${ record.id }` }
                />
                <Resource 
                    name={ queries.SiteConfigQueries.resourceName } 
                    edit={ SiteConfigEdit } 
                    show={ SiteConfigShow }
                    recordRepresentation={ (record) => "Site Config" }
                />
                <CustomRoutes>
                    <Route 
                        path={ `/${ queries.SiteConfigQueries.resourceName }` } 
                        element={ <SiteConfigShow /> } 
                    />
                </CustomRoutes>
            </Admin>
        </ApolloProvider>
    );
}