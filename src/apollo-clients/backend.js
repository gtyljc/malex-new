
import * as backend from "./queries/backend";
import * as tools from "@src/tools";
import { SetContextLink } from "@apollo/client/link/context";
import { nanoid } from "nanoid";

export default class BackendApolloClient {

    getAuthTokens(){
        return {
            rt: this.client.rt,
            at: this.client.at
        }
    }

    setAuthTokens(at, rt){
        this.client.at = at;
        this.client.rt = rt;
    }

    async setAT(){
        const { client } = tools.authApolloClient(targetClient.rt);
        const { at, rt } = (
            await client.mutate({ mutation: backend.frontendQueries.AuthQueries.createAT() })
        ).data.createAT.data[0];
    
        // update or set tokens into client instance
        this.setAuthTokens(at, rt, targetClient);
    }

    async setRT() {
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
        this.setAuthTokens(at, rt);
    }

    async init(){
        const { client, link } = tools.defaultApolloClient();
        
        this.client = client;
        this.link = link;

        // set start auth pair
        await this.setRT(client);
        
        const backLink = new SetContextLink(
            async ({ headers }) => {
                const { rt, at } = this.getAuthTokens();
                let token = at;

                //  if AT is expired
                if (tools.isJWTExpired(at)) {
    
                    // if RT is also expired
                    if (tools.isJWTExpired(rt)) await this.setRT();
                    else await this.setAT();
                };

                token = this.client.at;

                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${ token }`
                    }
                }
            }
        ).concat(link);

        client.setLink(backLink);

        return this;
    }
}

export const backendApolloClient = await new BackendApolloClient().init();

// creates new tokens pair and gets it from API !!! can be used only at server component !!!
export async function createAuthTokensForFrontend(role = "GUEST", userId = nanoid(16)) {
    const { at, rt } = (
        await backendApolloClient.client.mutate(
            { 
                mutation: backend.AuthQueries.createRT(), 
                variables: { role, user_id: userId } 
            }
        )
    ).data.createRT.data[0];

    return { at, rt };
}

