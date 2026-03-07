
import * as frontQueries from "./queries/frontend";
import BaseApolloClient from "./base";
import { Dayjs } from "dayjs";
import { dayjs } from "@lib/dayjs";
import { CountryCode } from "libphonenumber-js";

export interface SiteConfig {
    openingAt: Dayjs;
    closingAt: Dayjs;
    minDuration: number;
    supportEmail: string;
    phoneNumber: string;
    timezone: string;
    cCountry: CountryCode;
}

export default class FrontendApolloClient extends BaseApolloClient {
    siteConfig!: SiteConfig;

    // gets new 
    async createAT(){
        return await this.client.mutate({ mutation: frontQueries.AuthQueries.createAT() });
    }

    async setConfig(): Promise<this> {
        const config = (
            await frontendClient.client.query(
                { query: frontQueries.SiteConfigQueries.publicConfig() }
            )
        ).data.publicConfig.data[0];

        this.siteConfig = {
            openingAt: dayjs(config["opening_at"]),
            closingAt: dayjs(config["closing_at"]),
            minDuration: config["min_duration"],
            supportEmail: config["support_email"],
            phoneNumber: config["phone_number"],
            timezone: config["timezone"],
            cCountry: config["cCountry"]
        }

        return this;
    }

    // must be called only when document is loaded
    async init(){
        return await this.setConfig();
    }
}

export const frontendClient = await new FrontendApolloClient().init();