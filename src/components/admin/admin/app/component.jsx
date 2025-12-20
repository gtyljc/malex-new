
// others
import { Admin, Resource, CustomRoutes } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { AppointmentQueries, WorkQueries, SiteConfigQueries } from "@src/apollo-clients/requests/back-requests";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";

export default function AdminApp({ authPair }){

    // set auth pair ( RT & AT tokens )
    createRefreshAT(authPair.rToken, authPair.token).then();

    return(
        <Admin 
            dataProvider={ 
                new DataProvider(
                    apolloClient,
                    {
                        // add interface to work with GraphQL queries
                     
                        [ AppointmentQueries.resource ]: AppointmentQueries,
                        [ WorkQueries.resource ]: WorkQueries,
                        [ SiteConfigQueries.resource ]: SiteConfigQueries
                    }
                ) 
            }
            authProvider={ new AuthProvider(apolloClient, jwt) }
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