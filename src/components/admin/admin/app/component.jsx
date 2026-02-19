
// others
import { Admin, Resource, CustomRoutes, memoryStore } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { AppointmentQueries, WorkQueries, SiteConfigQueries } from "@lib/apollo-clients/queries/backend";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { useFrontendClient } from "@src/lib/apollo-clients/frontend";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";

export default function AdminApp({ authTokens }){
    const { frontendClient, isIntialized } = useFrontendClient(authTokens);
    
    if (!isIntialized) return null;

    // add link to remove typenames
    frontendClient.client.setLink(
        new RemoveTypenameFromVariablesLink()
            .concat(frontendClient.link)
    );

    return(
        <Admin 
            dataProvider={
                new DataProvider(
                    frontendClient.client,
                    {
                        [ AppointmentQueries.resource ]: AppointmentQueries,
                        [ WorkQueries.resource ]: WorkQueries,
                        [ SiteConfigQueries.resource ]: SiteConfigQueries
                    }
                )
            }
            authProvider={ new AuthProvider(frontendClient.client) }
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
    );
}