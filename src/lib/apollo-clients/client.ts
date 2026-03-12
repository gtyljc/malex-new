
"use client";

import "client-only";
import * as clientQueries from "./queries/client";
import dayjs from "dayjs";
import { CountryCode } from "libphonenumber-js";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import * as types from "@lib/types";
import { useEffect, useState } from "react";
import { RetryLink } from "@apollo/client/link/retry";

export interface SiteConfig {
    openingAt: dayjs.Dayjs;
    closingAt: dayjs.Dayjs;
    minDuration: number;
    supportEmail: string;
    phoneNumber: string;
    timezone: string;
    cCountry: CountryCode;
}

export default class ClientAC {
    siteConfig!: SiteConfig;
    client: ApolloClient;
    link: ApolloLink;

    constructor(){
        const link = ApolloLink.from(
            [
                new RetryLink(
                    { 
                        attempts: () => {
                            console.log("No connection with API at client, reconnecting...");

                            return true;
                        }, 
                        delay: () => parseInt(process.env.NEXT_PUBLIC_API_RECONNECT_DELAY)
                    }
                ),
                new HttpLink(
                    { 
                        uri: process.env.NEXT_PUBLIC_API_BASE_URL + "/graphql",
                        fetch: this.customFetch.bind(this)
                    }
                )
            ]
        );
        const cache = new InMemoryCache();

        this.client = new ApolloClient({ link, cache });
    }

    async customFetch(resource: string | URL | Request, options: RequestInit): Promise<Response | void> {
        const response = await fetch(
            resource,
            {
                credentials: "include",
                ...options
            }
        );
        const responseJSON: types.APIResponse<any> = await response.clone().json();

        // if AT is too old
        if (responseJSON.code == 403) {
            const atResponse = await this.generateNewAT();
            
            // if RT is too old
            if (atResponse.data.createAT.code == 403){
                return window.location.reload();
            }
        }

        return response;
    }

    // gets new 
    async generateNewAT(){
        return (
            await this.client.mutate(
                { mutation: clientQueries.AuthQueries.createAT() }
            )
        );
    }

    async setConfig(): Promise<this> {
        const config = (
            await this.client.query(
                { query: clientQueries.SiteConfigQueries.publicConfig() }
            )
        ).data.publicConfig.data[0];

        this.siteConfig = {
            openingAt: dayjs(config["opening_at"]),
            closingAt: dayjs(config["closing_at"]),
            minDuration: config["min_duration"],
            supportEmail: config["support_email"],
            phoneNumber: config["phone_number"],
            timezone: config["timezone"],
            cCountry: config["c_country"]
        }

        return this;
    }
}

export const clientAC = new ClientAC();

interface UseConfigReturn {
    isConfigLoaded: boolean,
    siteConfig: SiteConfig | undefined, 
    client: ClientAC
}

export function useConfig(): UseConfigReturn {
    const [ isConfigLoaded, setConfigAsLoaded ] = useState<boolean>(false);

    useEffect(
        () => { clientAC.setConfig().then(e => setConfigAsLoaded(true)); }
    )

    return {
        isConfigLoaded,
        siteConfig: clientAC.siteConfig,
        client: clientAC
    }
}