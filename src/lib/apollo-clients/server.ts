
import "server-only";
import * as queries from "./queries/server";
import { createRT } from "../auth";
import * as types from "@lib/types";
import * as errors from "@src/lib/errors";
import { BaseAC } from "./base";
import { dayjs } from "@lib/dayjs/server";

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

export default class ServerAC extends BaseAC {
    tokenStorage: AuthTokenStorage;

    constructor() {
        super({ toLoad: [ () => dayjs.tz.setDefault(this.siteConfig.timezone) ] });

        this.toLoad = [ this.generateNewRT.bind(this) ].concat(this.toLoad)

        this.tokenStorage = new AuthTokenStorage();
    }

    async customFetch(resource: string | URL | Request, options: RequestInit): Promise<Response> {        
        const requestOptions = options;
        const headers = new Headers(options.headers);

        headers.append("Authorization", "Bearer " + this.tokenStorage.get().at);

        requestOptions.headers = headers;

        const response = await super.customFetch(resource, requestOptions);
        const responseJSON: types.APIResponse<any> = await response.clone().json();

        if (responseJSON.code == 403){
            await this.generateNewAT();
        }
        
        return response;
    }

    async generateNewAT(): Promise<void> {
        const { at, rt } = (
            await this.client.mutate(
                { mutation: queries.webQueries.AuthQueries.createAT() }
            )
        ).data.createAT.data[0];

        // update or set tokens into client instance
        this.tokenStorage.set(rt, at);
    }

    async generateNewRT(): Promise<void> {
        const r = await createRT({ userId: null, role: "SUPERUSER" });
        
        if (!r.success){
            throw new errors.RTCreationError();
        }

        // update or set tokens into client instance
        this.tokenStorage.set(r.data[0].at, r.data[0].rt);
    }
}

// all serverQueries requests must be executed through this client instance
export const serverAC = await new ServerAC().init();