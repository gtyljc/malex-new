
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { AuthQueries } from "./requests/back-requests";
import { AuthQueries as frAuthQueries } from "./requests/front-requests";
import { SetContextLink } from "@apollo/client/link/context";
import { decodeJwt } from "jose";
import dayjs from "dayjs";

// checks if jwt expired ( JWT must contain "exp" claim )
function isJWTExpired(jwt){
    // console.log(jwt);

    return decodeJwt(jwt)["exp"] < dayjs().unix();
}

// returns instanse of absolutly pure ApolloClient, that is connected to API
function defaultClient() {
    const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });

    return {
        client: new ApolloClient({ link: httpLink, cache: new InMemoryCache()}),
        link: httpLink
    }
}

// returns instanse of ApolloClient, that has Authorization header
function defaultClientWithAuth(jwt) {
    const { client, link } = defaultClient();
    const authLink = new SetContextLink(
        ({ headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${jwt}`
                }
            }
        }
    ).concat(link);

    client.setLink(authLink);

    return { client, link }
}

// returns ApolloClient, that must be placed at client component ( "use client" strict )
export function frontClient(){
    const { client, link } = defaultClient();
    const newLink = new SetContextLink(
        async ({ headers }) => {
            const at = localStorage.getItem("token");

            // console.log(at)

            // checks is AT expired
            if (isJWTExpired(at)){
                const rt = localStorage.getItem("r_token");

                // if not, then checks is RT expired
                if(isJWTExpired(rt)) window.location.reload();

                // if everytjhing is fine then get new auth pair
                await createRefreshAT(rt);
            }

            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${at}`
                }
            }
        }
    ).concat(link);
    
    // register link
    client.setLink(newLink);

    return { client, newLink };
}

// returns ApolloClient with "Authorization" header, that cointains "ADMIN" role
export async function backClient(){
    const { client, link } = defaultClient();
    
    // init credentials
    await createRefreshRT(client);

    const authLink = new SetContextLink(
        async ({ headers }) => {

            // check if AT is expired
            if (isJWTExpired(client.token)) await createRefreshRT();

            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${client.token}`
                }
            }
        }
    ).concat(link);

    // register link
    client.setLink(authLink);

    return { client, authLink };
}

// creates pair of two keys ( AT & RT ) and must be used only when global 
// Apollo Client has no keys at all, or RT is expired
async function createRefreshRT(targetClient = global.ApolloClient) {
    const { client } = defaultClient(); // to avoid recursion in link
    const r = await client.mutate(
        { 
            mutation: AuthQueries.createRT(), 
            variables: { role: "SUPERUSER" } 
        }
    );

    // modify target client
    targetClient.rToken = r.data.createRT.data[0].r_token;
    targetClient.token = r.data.createRT.data[0].token;
}

// creates new pair with RT and AT and sets them in local storage,
// must be used when AT is expired !!! FOR CLIENT ONLY !!!
export async function createRefreshAT(rt, at) {
    // if client has no correct AT
    if (!at){
        const { client } = defaultClientWithAuth(rt);
        const { token, r_token } = (
            await client.mutate(
                { mutation: frAuthQueries.createAT() }
            )
        ).data.createAT.data[0];

        rt = r_token;
        at = token;
    }
    
    // set / reset credentials at browser
    localStorage.setItem("token", at);
    localStorage.setItem("r_token", rt);
}

// creates new pair with RT and AT and sets them in local storage,
// must be used when AT is expired !!! FOR SERVER ONLY !!!
export async function getAuthPair(role, client = global.apolloClient) {
    const { token, r_token } = (
        await client.mutate(
            { mutation: AuthQueries.createRT(), variables: { role } }
        )
    ).data.createRT.data[0];

    return { rToken: r_token, token };
}