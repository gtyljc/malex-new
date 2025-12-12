
// others
import { Admin, Resource, CustomRoutes } from "react-admin";
import AuthProvider from "./auth-provider";
import { Route } from "react-router-dom";
import DataProvider from "./data-provider";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { AppointmentQueries, WorkQueries, SiteConfigQueries } from "@src/apollo-clients/requests/back-requests";
import { defaultClient } from "@src/apollo-clients/clients";
import { SetContextLink } from "@apollo/client/link/context";

// components
import { AppointmentEdit, AppointmentList } from "@admin/appointment/component";
import { WorkCreate, WorkEdit, WorkList } from "@admin/work/component";
import { SiteConfigShow, SiteConfigEdit } from "@admin/site-config/component";
import CustomLayout from "@admin/custom-layout/component";

export default function AdminApp({ jwt }){

    // add "user" jwt
    localStorage.setItem("token", jwt);

    const [ apolloClient, link ] = defaultClient(jwt);
    
    // set up client
    apolloClient.setLink(
        new RemoveTypenameFromVariablesLink()
        .concat(

            // sets authorization token that specified now in storage
            new SetContextLink(({ headers }) => {
                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            })
        )
        .concat(link)
    )

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