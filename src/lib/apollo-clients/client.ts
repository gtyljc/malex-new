
"use client";

import "client-only";
import { CreateAtDocument } from "./queries/Auth.generated";
import { BaseAC } from "./base";
import { useEffect, useState } from "react";
import { dayjs } from "@lib/dayjs/client";

export default class ClientAC extends BaseAC {
    constructor(){
        super(
            { toLoad: [ () => dayjs.tz.setDefault(this.siteConfig.timezone) ] }
        )
    }

    async customFetch(resource: string | URL | Request, options: RequestInit): Promise<Response> {
        const requestOptions = options;

        requestOptions.credentials = "include";

        const response = await super.customFetch(resource, requestOptions);

        // if AT is too old
        if (response.status == 403) {
            const atResponse = await this.generateNewAT();
            
            // if RT is too old
            if (atResponse.data.createAT.code == 403){
                window.location.reload();
            }
        }

        return response;
    }

    // gets new 
    async generateNewAT(){
        return (
            await this.client.mutate({ mutation: CreateAtDocument })
        );
    }
}

export const clientAC = new ClientAC();

export function useClientAC(){
    const [ isInitialized, setInitFlag ] = useState<boolean>(false);

    useEffect(() => { clientAC.init().then(() => setInitFlag(true)) });

    return {
        ac: clientAC,
        isInitialized,
        siteConfig: clientAC.siteConfig,
        link: clientAC.link,
        client: clientAC.client
    }
}