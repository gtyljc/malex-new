
import * as backend from "./requests/backend";
import * as tools from "@src/tools";
import { SetContextLink } from "@apollo/client/link/context";
import { nanoid } from "nanoid";

export default class BackendApolloClient {
    constructor(){
        const { client, link } = tools.defaultApolloClient();
        
        // set start auth pair
        this.setRT(client).then();
        
        const backLink = new SetContextLink(
            async ({ headers }) => {
        
                //  if AT is expired
                if (tools.isJWTExpired(this.client.at)) {
    
                    // if RT is also expired
                    if (tools.isJWTExpired(this.client.rt)) await this.setRT();
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

        client.setLink(backLink);

        this.link = link;
        this.client = client;
    }

    setAuthTokens(at, rt, client){
        client.at = at;
        client.rt = rt;
    }

    async setAT(targetClient = global.apolloClient){
        const { client } = tools.authApolloClient(targetClient.rt);
        const { at, rt } = (
            await client.mutate({ mutation: backend.frontendQueries.AuthQueries.createAT() })
        ).data.createAT.data[0];
    
        // update or set tokens into client instance
        this.setAuthTokens(at, rt, targetClient);
    }

    async setRT(targetClient = global.apolloClient) {
        const { client } = tools.defaultApolloClient();
        const { at, rt } = (
            await client.mutate(
                { 
                    mutation: backend.AuthQueries.createRT(), 
                    variables: { user_id: nanoid(16), role: "SUPERUSER" }  
                }
            )
        ).data.createRT.data[0];
    
        // update or set tokens into client instance
        this.setAuthTokens(at, rt, targetClient);
    }
}

// creates new tokens pair and gets it from API !!! can be used only at server component !!!
export async function createAuthTokensForFrontend(role = "GUEST", userId = nanoid(16), client = global.apolloClient) { // default settings are for guest user
    const { at, rt } = (
        await client.mutate(
            { 
                mutation: backend.AuthQueries.createRT(), 
                variables: { role, user_id: userId } 
            }
        )
    ).data.createRT.data[0];

    return { at, rt };
}

