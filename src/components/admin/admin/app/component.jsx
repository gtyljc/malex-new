
// others
import { Admin, Resource, CustomRoutes, memoryStore } from "react-admin";
import { useEffect } from "react";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { AppointmentQueries, WorkQueries, SiteConfigQueries } from "@lib/apollo-clients/queries/backend";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import FrontendApolloClient from "@lib/apollo-clients/frontend";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";

export default function AdminApp({ authTokens }){

    // set auth pair ( RT & AT tokens )
    useEffect(() => { FrontendApolloClient.initTokens(authTokens.at, authTokens.rt) });

    const frontendClient = new FrontendApolloClient().init();

    // add link to remove typenames
    frontendClient.client.setLink(new RemoveTypenameFromVariablesLink().concat(frontendClient.link));

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
            <Resource name={ AppointmentQueries.resource } list={ AppointmentList } edit={ AppointmentEdit } />
            <Resource name={ WorkQueries.resource } list={ WorkList } create={ WorkCreate } edit={ WorkEdit } />
            <Resource name={ SiteConfigQueries.resource } edit={ SiteConfigEdit } show={ SiteConfigShow } />
            <CustomRoutes>
                <Route path={ `/${SiteConfigQueries.resource}` } element={ <SiteConfigShow /> } />
            </CustomRoutes>
        </Admin>
    );
}