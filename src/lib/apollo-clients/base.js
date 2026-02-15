
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";

// returns absolutly standard apollo client, that connected to API
export function defaultApolloClient(cacheOptions = {}){
    const link = new RetryLink(
        { attempts: () => { true; console.log("Connecting to API...") },
        delay: () => parseInt(process.env.API_RECONNECT_DELAY) }
    ).concat(new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL }));

    return {
        client: new ApolloClient({ link, cache: new InMemoryCache(cacheOptions) }),
        link
    }
}

// returns apollo client, that connected to API and has auth header
export function authApolloClient(jwt){ // can be AT or RT
    const { client, link } = defaultApolloClient();
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

    return { client, link: authLink }
}