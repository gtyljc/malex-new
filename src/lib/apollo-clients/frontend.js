
import { SetContextLink } from "@apollo/client/link/context";
import * as frontQueries from "./queries/frontend";
import { defaultApolloClient, authApolloClient, isJWTExpired } from "./base";
import { useEffect, useState } from "react";

export default class FrontendApolloClient {

    constructor(){
        this.client = null;
        this.link = null;
        this.siteConfig = null;
        this.isIntialized = false;
    }

    // gets new 
    async updateAT(){
        const localTokens = this.getAuthTokens();
        const { client } = authApolloClient(localTokens.rt);
        const { at, rt } = (
            await client.mutate({ mutation: frontQueries.AuthQueries.createAT() })
        ).data.createAT.data[0];

        // save tokens
        this.setAuthTokens(at, rt);

        return { at, rt }
    }

    // get auth tokens from localStorage
    getAuthTokens(){
        return {
            rt: localStorage.getItem("r_token"),
            at: localStorage.getItem("a_token")
        }
    }

    // save auth tokens into localStorage
    setAuthTokens(at, rt){
        localStorage.setItem("r_token", rt); // refresh token
        localStorage.setItem("a_token", at); // access token
    }

    prepareApolloClient(newAuthTokens){
        const pThis = this;

        // checks old tokens ( if they exist ) and replace with new ( if nessecary )
        function setTokens(newAT, newRT){

            // get local RT ( if it is here ) and if RT has expired => resets with new pair that got from server
            const { rt } = pThis.getAuthTokens();

            if (rt && isJWTExpired(rt) || !rt) pThis.setAuthTokens(newAT, newRT);
        }

        const { client, link } = new defaultApolloClient();
        
        client.setLink(
            new SetContextLink(
                async ({ headers }) => {
                    let { at, rt } = this.getAuthTokens();

                    // checks is AT expired
                    if (isJWTExpired(at)){

                        // reload page if RT has expired, and then replace with new pair of tokens
                        if (isJWTExpired(rt)) { window.location.reload() };

                        // reset with new value and continue request
                        at = (await this.updateAT()).at;
                    }

                    return {
                        headers: {
                            ...headers,
                            authorization: `Bearer ${ at }`
                        }
                    }
                }
            ).concat(link)
        )

        setTokens(newAuthTokens.at, newAuthTokens.rt);

        return { client, link };
    }

    async setSiteConfig(){
        this.siteConfig = (
            await frontendClient.client.query(
                { query: frontQueries.SiteConfigQueries.publicConfig() }
            )
        ).data.publicConfig.data[0];
    }

    // must be called only when document is loaded
    async init(newAuthTokens){
        const { client, link } = this.prepareApolloClient(newAuthTokens);

        this.link = link;
        this.client = client;
        this.isIntialized = true;

        await this.setSiteConfig();

        return this;
    }
}

export const frontendClient = new FrontendApolloClient();

export function useFrontendClient(newAuthTokens){
    const [ isIntialized, setInitializedFlag ] = useState(frontendClient.isIntialized);

    useEffect(
        () => {

            // init client if necessary
            if (!isIntialized){ 
                frontendClient.init(newAuthTokens)
                    .then(() => setInitializedFlag(true))
            }
        }
    );

    return { 
        isIntialized, 
        client: frontendClient.client,
        link: frontendClient.link,
        siteConfig: frontendClient.siteConfig
    };
}