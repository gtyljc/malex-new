
import "server-only";
import * as serverQueries from "./queries/server";
import { createRT } from "../auth";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import * as errors from "@lib/errors";
import * as types from "@lib/types";
import * as tools from "@lib/tools";
import { env } from "../tools";
import dayjs from "dayjs";
import { CountryCode } from "libphonenumber-js";

export interface SiteConfig {
    openingAt: dayjs.Dayjs;
    closingAt: dayjs.Dayjs;
    minDuration: number;
    supportEmail: string;
    phoneNumber: string;
    timezone: string;
    cCountry: CountryCode;
}

class AuthTokenStorage {
    private rt!: string;
    private at!: string;

    set(rt: string, at: string) {
        this.rt = rt;
        this.at = at;
    }

    get() {
        return {
            rt: this.rt,
            at: this.at
        }
    }
}

export default class ServerAC {
    tokenStorage: AuthTokenStorage;
    client: ApolloClient;
    link: ApolloLink;
    siteConfig: SiteConfig;

    constructor() {
        const link = new HttpLink(
            {  
                uri: "http://localhost:2000" + "/graphql", 
                fetch: this.customFetch.bind(this)
            }
        );
        const cache = new InMemoryCache();

        this.client = new ApolloClient({ link, cache });
        this.tokenStorage = new AuthTokenStorage();
    }

    async customFetch(resource: string | URL | Request, options: RequestInit): Promise<Response> {        
        // be careful, before to send this request, make sure
        // that you set "aud" param to "SUPERUSER", otherwise
        // you will get no tokens

        const RECONNECT_DELAY = 2000;

        while (true){
            try {
                const response = await fetch(
                    resource,
                    {
                        headers: { "Authorization": "Bearer " + this.tokenStorage.get().at },
                        ...options
                    }
                )
                const responseJSON: types.APIResponse<any> = await response.json();

                if (responseJSON.code == 403){
                    await this.generateNewAT();
                }
                
                return response;
            }
            catch {
                await tools.sleep(RECONNECT_DELAY);

                continue;
            }
        }
    }

    async generateNewAT(): Promise<void> {
        const { at, rt } = (
            await this.client.mutate(
                { mutation: serverQueries.AuthQueries.createAT() }
            )
        ).data.createAT.data[0];

        // update or set tokens into client instance
        this.tokenStorage.set(rt, at);
    }

    async generateNewRT(): Promise<void> {
        const r = await createRT({ userId: null, role: "SUPERUSER" });

        console.log(r);

        // if (!r.success){
        //     throw new errors.RTCreationError();
        // }

        // update or set tokens into client instance
        this.tokenStorage.set(r.data[0].at, r.data[0].rt);
    }

    async setConfig(): Promise<this> {
        const config = (
            await this.client.query(
                { 
                    query: new serverQueries.SiteConfigQueries().getOne(), 
                    variables: { id: "1" } 
                },
            )
        ).data.siteConfig.data[0];

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

    async init() {

        // set start auth pair
        await this.generateNewRT();

        return this;
    }
}

// all serverQueries requests must be executed through this client instance
export const serverAC = await new ServerAC().init();