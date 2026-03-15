
import * as queries from "./queries/web";
import dayjs from "dayjs";
import { CountryCode } from "libphonenumber-js";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { InMemoryCacheConfig } from "@apollo/client";

interface SiteConfig {
    openingAt: dayjs.Dayjs;
    closingAt: dayjs.Dayjs;
    minDuration: number;
    supportEmail: string;
    phoneNumber: string;
    timezone: string;
    cCountry: CountryCode;
}

interface BaseACParams {
    apiURI?: string,
    inMemoryCacheConfig?: InMemoryCacheConfig
    toLoad?: Function[]
    retryLinkParams?: RetryLink.Options,
    httpLinkParams?: HttpLink.Options
    apolloClientParams?: Omit<ApolloClient.Options, "link" | "cache">
}

export class BaseAC {
    siteConfig!: SiteConfig;
    client: ApolloClient;
    link: ApolloLink;
    cache: InMemoryCache;
    isInitialized: boolean;
    toLoad: Function[];

    constructor (
        { 
            apiURI = process.env.NEXT_PUBLIC_API_BASE_URL + "/graphql", 
            inMemoryCacheConfig = {},
            retryLinkParams = {},
            httpLinkParams = {},
            apolloClientParams = {},
            toLoad = []
        }: BaseACParams = {}
    ){
        this.link = ApolloLink.from(
            [
                new RetryLink(
                    { 
                        attempts: this.attempts.bind(this), 
                        delay: this.delay.bind(this),
                        ...retryLinkParams
                    }
                ),
                new HttpLink({ uri: apiURI, fetch: this.customFetch.bind(this), ...httpLinkParams })
            ]
        );
        this.toLoad = [ this.setConfig.bind(this) ].concat(toLoad);
        this.cache = new InMemoryCache(inMemoryCacheConfig);
        this.client = new ApolloClient({ link: this.link, cache: this.cache, ...apolloClientParams });
    }

    attempts(attempt: number, operation: ApolloLink.Operation, error: Error): boolean {
        console.log(`Failure at sending ${ operation.operationName } because of ${ error.name }! Attempt ${ attempt }`);
        
        return true
    }

    delay(ms: number = parseInt(process.env.NEXT_PUBLIC_API_RECONNECT_DELAY)){
        return ms;
    }

    async customFetch(resource: string | URL | Request, options: RequestInit): Promise<Response> { 
        return await fetch(resource, options);
    }

    async setConfig(): Promise<void> {
        const config = (
            await this.client.query(
                { query: queries.SiteConfigQueries.publicConfig() },
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
    }

    async init(): Promise<this> {
        for (let toLoadFunc of this.toLoad){
            let r = toLoadFunc();

            if (r instanceof Promise){
                r = await r;
            }
        }

        return this;
    }
}