
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { decodeJwt } from "jose";
import dayjs from "dayjs";

// makes first letter capital
export function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// removes element and returns new array
export function patch(array, ...args){
    return array.filter(e => !args.includes(e));
}

// all to lower case and capitalize first letter
export function normalizeString(string){
    return capitalize(string.toLowerCase())
}

// stops function on delay, which was in ms specified
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// returns absolutly standard apollo client, that connected to API
export function defaultApolloClient(){
    const link = new RetryLink(
        { attempts: () => true, delay: () => 5000 }
    ).concat(new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL }));

    return {
        client: new ApolloClient(
            { link, cache: new InMemoryCache()}
        ),
        link
    }
}

// returns apollo client, that connected to API and has auth header
export function authApolloClient(jwt){ // can be AT or RT
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

    return {
        client,
        link: authLink
    }
}

// checks if jwt expired ( JWT must contain "exp" claim )
export function isJWTExpired(jwt){
    return decodeJwt(jwt)["exp"] < dayjs().unix();
}