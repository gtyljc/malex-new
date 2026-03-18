
import "server-only";
import { createRT, createAT } from "../auth";
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
        const responseJSON: types.APIResponse = await response.clone().json();

        if (responseJSON.code == 403){
            await this.generateNewAT();
        }
        
        return response;
    }

    async generateNewAT(): Promise<void> {
        const r = await createAT({ userId: null, role: types.RoleEnum.Superuser });
        
        if (!r.success){
            throw new errors.RTCreationError();
        }

        // update or set tokens into client instance
        this.tokenStorage.set(r.data[0].rt, r.data[0].at);
    }

    async generateNewRT(): Promise<void> {
        const r = await createRT({ userId: null, role: types.RoleEnum.Superuser });
        
        if (!r.success){
            throw new errors.RTCreationError();
        }

        // update or set tokens into client instance
        this.tokenStorage.set(r.data[0].rt, r.data[0].at);
    }
}

// all serverQueries requests must be executed through this client instance
export const serverAC = await new ServerAC().init();