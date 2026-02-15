
import { SetContextLink } from "@apollo/client/link/context";
import * as tools from "@lib/tools";
import * as frontQueries from "./queries/frontend";
import { defaultApolloClient, authApolloClient } from "./base";

export default class FrontendApolloClient {
    // must be initialiazed only at client component

    // gets new 
    async setAT(){
        const localTokens = FrontendApolloClient.getAuthTokens();
        const { client } = authApolloClient(localTokens.rt);
        const { at, rt } = (
            await client.mutate({ mutation: frontQueries.AuthQueries.createAT() })
        ).data.createAT.data[0];

        // save tokens
        FrontendApolloClient.setAuthTokens(at, rt);

        return { at, rt }
    }

    // get auth tokens from localStorage
    static getAuthTokens(){
        return {
            rt: localStorage.getItem("r_token"),
            at: localStorage.getItem("a_token")
        }
    }

    // save auth tokens into localStorage
    static setAuthTokens(at, rt){
        localStorage.setItem("r_token", rt); // refresh token
        localStorage.setItem("a_token", at); // access token
    }

    // must be called before running init method at, it useEffect hook
    // checks old ( if they exist ) tokens and replace with new ( if nessecary )
    static initTokens(newAT, newRT){

        // get local RT ( if it is here ) and if RT has expired => resets with new pair that got from server
        const { rt } = FrontendApolloClient.getAuthTokens();

        if (rt && tools.isJWTExpired(rt) || !rt) {
            FrontendApolloClient.setAuthTokens(newAT, newRT) 
        };
    }

    init(){
        const { client, link } = new defaultApolloClient();

        this.link = link;
        this.client = client;

        const frontLink = new SetContextLink(
            async ({ headers }) => {
                let { at, rt } = FrontendApolloClient.getAuthTokens();

                // checks is AT expired
                if (tools.isJWTExpired(at)){
                    console.log("wldlwdldw")

                    // reload page if RT has expired, and then replace with new pair of tokens
                    if (tools.isJWTExpired(rt)) { window.location.reload() };

                    // reset with new value and continue request
                    at = (await this.setAT()).at;
                }

                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${ at }`
                    }
                }
            }
        ).concat(link);

        client.setLink(frontLink);

        return this;
    }
}