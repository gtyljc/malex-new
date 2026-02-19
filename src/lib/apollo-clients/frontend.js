
"use client";

import { SetContextLink } from "@apollo/client/link/context";
import * as frontQueries from "./queries/frontend";
import { defaultApolloClient, authApolloClient, isJWTExpired } from "./base";
import { useEffect, useState } from "react";

export default class FrontendApolloClient {

    // gets new 
    async setAT(){
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

    // must be called before running init method at, it useEffect hook
    // checks old ( if they exist ) tokens and replace with new ( if nessecary )
    initTokens(newAT, newRT){

        // get local RT ( if it is here ) and if RT has expired => resets with new pair that got from server
        const { rt } = this.getAuthTokens();

        if (rt && isJWTExpired(rt) || !rt) {
            this.setAuthTokens(newAT, newRT) 
        };
    }

    // must be called only when document is loaded
    async init(authTokens){
        const { client, link } = new defaultApolloClient();

        this.link = link;
        this.client = client;

        const frontLink = new SetContextLink(
            async ({ headers }) => {
                let { at, rt } = this.getAuthTokens();

                // checks is AT expired
                if (isJWTExpired(at)){

                    // reload page if RT has expired, and then replace with new pair of tokens
                    if (isJWTExpired(rt)) { window.location.reload() };

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

        this.initTokens(authTokens.at, authTokens.rt);

        return this;
    }
}

export const frontendClient = new FrontendApolloClient();

export function useFrontendClient(authTokens){
    const [ isIntialized, setInitializedFlag ] = useState(false);

    useEffect( 
        () => {
            frontendClient.init(authTokens).then(
                () => setInitializedFlag(true)
            )
        }
    );

    return { isIntialized, frontendClient };
}