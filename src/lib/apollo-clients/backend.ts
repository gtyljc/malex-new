
import * as backend from "./queries/backend";
import BaseApolloClient from "./base";
import { createRT } from "../auth";

class AuthTokenStorage {
    rt!: string;
    at!: string;

    set(rt: string, at: string){
        this.rt = rt;
        this.at = at;
    }

    get(){
        return {
            rt: this.rt,
            at: this.at
        }
    }
}

export default class BackendApolloClient extends BaseApolloClient {
    tokenStorage: AuthTokenStorage;

    constructor(){
        super();

        this.tokenStorage = new AuthTokenStorage();
    }

    async createAT(){
        const { at, rt } = (
            await this.client.mutate({ mutation: backend.frontend.AuthQueries.createAT() })
        ).data.createAT.data[0];
    
        // update or set tokens into client instance
        this.tokenStorage.set(rt, at);
    }

    async createRT() {
        const r = await createRT({ userId: null, role: "SUPERUSER" });

        // update or set tokens into client instance
        this.tokenStorage.set(r.at, r.rt);
    }

    async init(){

        // set start auth pair
        await this.createRT();

        return this;
    }
}

// all backend requests must be executed through this client instance
export const backendClient = await new BackendApolloClient().init();