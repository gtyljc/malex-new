
import { defaultBackClient } from "./apollo-clients/clients"

export async function register() {
    
    // add global ApolloClient, that will only backend use
    global.apolloClient = (await defaultBackClient())[0];
}