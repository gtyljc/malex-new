
// others
import { Admin, Resource, CustomRoutes } from "react-admin";
import { useEffect } from "react";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { AppointmentQueries, WorkQueries, SiteConfigQueries } from "@src/apollo-clients/requests/back-requests";
import { frontClient } from "@src/apollo-clients/clients";
import { setRTForFront } from "@src/apollo-clients/clients";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";

export default function AdminApp({ authPair }){
    const { client, link } = frontClient();

    // add link to remove typenames
    client.setLink(new RemoveTypenameFromVariablesLink().concat(link));

    // set auth pair ( RT & AT tokens )
    useEffect(() => { setRTForFront(authPair.rToken, authPair.token) });

    return(
        <Admin 
            dataProvider={
                new DataProvider(
                    client,
                    {
                        [ AppointmentQueries.resource ]: AppointmentQueries,
                        [ WorkQueries.resource ]: WorkQueries,
                        [ SiteConfigQueries.resource ]: SiteConfigQueries
                    }
                ) 
            }
            authProvider={ new AuthProvider(client) }
            layout={ CustomLayout }
            requireAuth
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