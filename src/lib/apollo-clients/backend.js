
import * as backend from "./queries/backend";
import { SetContextLink } from "@apollo/client/link/context";
import { nanoid } from "nanoid";
import { defaultApolloClient, authApolloClient, isJWTExpired } from "./base";

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
        const { client } = authApolloClient(this.client.rt);
        const { at, rt } = (
            await client.mutate({ mutation: backend.frontend.AuthQueries.createAT() })
        ).data.createAT.data[0];
    
        // update or set tokens into client instance
        this.setAuthTokens(at, rt);
    }

    async setRT() {
        const { client } = defaultApolloClient();
        const { at, rt } = (
            await client.mutate(
                { 
                    mutation: backend.AuthQueries.createRT(), 
                    variables: { user_id: null, role: "SUPERUSER" }  
                }
            )
        ).data.createRT.data[0];
    
        // update or set tokens into client instance
        this.setAuthTokens(at, rt);
    }

    async init(){
        const { client, link } = defaultApolloClient({ resultCaching: false });
        
        this.client = client;
        this.link = link;

        // set start auth pair
        await this.setRT(client);
        
        const backLink = new SetContextLink(
            async ({ headers }) => {
                const { rt, at } = this.getAuthTokens();
                let token = at;

                //  if AT is expired
                if (isJWTExpired(at)) {
    
                    // if RT is also expired
                    if (isJWTExpired(rt)) await this.setRT();
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

// creates new tokens pair and gets it from API !!! can be used only at server component !!!
export async function createAuthTokens({ userId = null, role = "GUEST" } = {}) {
    const { at, rt } = (
        await backendClient.client.mutate(
            { 
                mutation: backend.AuthQueries.createRT(), 
                variables: { role, user_id: userId } 
            }
        )
    ).data.createRT.data[0];

    return { at, rt };
}

// all backend requests must be executed through this client instance
export const backendClient = await new BackendApolloClient().init();