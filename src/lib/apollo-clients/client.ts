
"use client";

import "client-only";
import * as clientQueries from "./queries/client";
import dayjs from "dayjs";
import { CountryCode } from "libphonenumber-js";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import * as types from "@lib/types";
import { env } from "../tools";

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
        const link = new HttpLink(
            { 
                uri: "http://localhost:2000" + "/graphql",
                fetch: this.customFetch.bind(this)
            }
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
        )
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

    private async setConfig(): Promise<this> {
        const config = (
            await this.client.query(
                { query: clientQueries.SiteConfigQueries.publicConfig() }
            )
        ).data.publicConfig.data[0];

        console.log(config);

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

    // must be called only when document is loaded
    async init(): Promise<this>{
        

        return await this.setConfig();
    }
}

export const clientAC = await new ClientAC().init();