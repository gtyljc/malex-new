
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { AuthQueries } from "./requests/back-requests";
import { SetContextLink } from "@apollo/client/link/context";
import { decodeJwt } from "jose";
import dayjs from "dayjs";


// link that adds authorization header to each operation
export const authLink = (jwt) => new SetContextLink(
    async ({ headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${jwt}`
            }
        }
    }
);

// returns instanse of absolutly pure ApolloClient, that is connected to API
// and it's link
export function defaultClient() {
    const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });

    return [
        new ApolloClient({ link: httpLink, cache: new InMemoryCache()}),
        httpLink
    ]
}

// gets JWT with specified role, if client is not specified the default will be used
export async function getJWT(role, client){
    return (
        await client.mutate(
            {
                mutation: AuthQueries.createJWT(),
                variables: { role } 
            }
        )
    ).data.createJWT.data[0].token;
}

// returns ApolloClient with "Authorization" header, that cointains "USER" role
export function defaultFrontClient(jwt){
    const [ client, link ] = defaultClient();
    const newLink = authLink(jwt).concat(link);

    client.setLink(newLink);

    return [client, newLink];
}

// returns ApolloClient with "Authorization" header, that cointains "ADMIN" role
export async function defaultBackClient(){
    const [ client, link ] = defaultClient();
    const jwt = await getJWT("ADMIN", client);
    const newLink = authLink(jwt).concat(link);

    return [ client, newLink ];
}