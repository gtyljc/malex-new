
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { AuthQueries } from "./requests/back-requests";
import { AuthQueries as frAuthQueries } from "./requests/front-requests";
import { SetContextLink } from "@apollo/client/link/context";
import { decodeJwt } from "jose";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { RetryLink } from "@apollo/client/link/retry";

// checks if jwt expired ( JWT must contain "exp" claim )
function isJWTExpired(jwt){
    return decodeJwt(jwt)["exp"] < dayjs().unix();
}

// returns instanse of absolutly pure ApolloClient, that is connected to API
function defaultClient() {
    const link = new RetryLink(
        { 
            attempts: () => true, 
            delay: () => 5000 
        }
    ).concat(new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL }));

    return {
        client: new ApolloClient({ link, cache: new InMemoryCache()}),
        link
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
            let at = localStorage.getItem("token");

            // checks is AT expired
            if (isJWTExpired(at)){
                const rt = localStorage.getItem("r_token");

                // if RT is also expired
                if(isJWTExpired(rt)) window.location.reload();
                else await setATForFront(rt);
                
                // reset with new value
                at = localStorage.getItem("token");
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

    return { client, link: newLink };
}

// returns ApolloClient with "Authorization" header, that cointains "ADMIN" role
export async function backClient(){
    const { client, link } = defaultClient();

    // init credentials; in case API is not reachable, try until will be connected 
    await setRTForBack(client);

    const authLink = new SetContextLink(
        async ({ headers }) => {
   
            //  if AT is expired
            if (isJWTExpired(client.token)) {

                // if RT is also expired
                if (isJWTExpired(client.rToken)) await setRTForBack();
                else await setATForBack();
            };

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

async function setATForBack(targetClient = global.apolloClient) {
    const { client } = defaultClientWithAuth(targetClient.rToken);
    const { token, r_token } = (
        await client.mutate({ mutation: frAuthQueries.createAT() })
    ).data.createAT.data[0];

    // modify target client
    targetClient.rToken = r_token;
    targetClient.token = token;
}

async function setRTForBack(targetClient = global.apolloClient) {
    const { client } = defaultClient();
    const { token, r_token } = (
        await client.mutate(
            { 
                mutation: AuthQueries.createRT(), 
                variables: { user_id: nanoid(16), role: "SUPERUSER" }  
            }
        )
    ).data.createRT.data[0];

    // modify target client
    targetClient.rToken = r_token;
    targetClient.token = token;
}

// sets local auth pair into 
export function setAuthPairLocal(rt, at) {
    localStorage.setItem("r_token", rt);
    localStorage.setItem("token", at);
}

// gets auth from local storage
export function getAuthPairLocal(){
    return {
        token: localStorage.getItem("token"),
        rToken: localStorage.getItem("r_token")
    }
}

export async function setATForFront() {
    const authPair = getAuthPairLocal();
    const { client } = defaultClientWithAuth(authPair.rToken);
    const { token, r_token } = (
        await client.mutate({ mutation: frAuthQueries.createAT() })
    ).data.createAT.data[0];

    // save tokens
    setAuthPairLocal(r_token, token);
}

export function setRTForFront(rt, at) {
    const authPair = getAuthPairLocal();

    // in case that user doesn't have auth pair
    if (!authPair.token && !authPair.rToken){
        setAuthPairLocal(rt, at);
    }
    else {
        if (isJWTExpired(authPair.rToken)){
            setAuthPairLocal(rt, at);
        }
    }
}

// creates new pair with RT and AT and sets them in local storage,
// must be used when AT is expired !!! FOR SERVER ONLY !!!
export async function getAuthPair(user_id, role, client = global.apolloClient) {
    const { token, r_token } = (
        await client.mutate(
            { 
                mutation: AuthQueries.createRT(), 
                variables: { role, user_id } 
            }
        )
    ).data.createRT.data[0];

    return { rToken: r_token, token };
}