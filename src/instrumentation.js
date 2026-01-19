
import BackendApolloClient from "@src/apollo-clients/backend"

export async function register() {
    
    // add global ApolloClient, that will only backend use
    global.apolloClient = new BackendApolloClient().client;
}