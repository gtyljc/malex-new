
import * as types from "@lib/types";

class LoggedError extends Error {
    apiResponse!: types.APIResponse;

    logError(logLevel: "error" | "debug" | "info" = "error"){
        // console.log(`Error ${ this.name } was occured! Check logs to get more info.`);

        console[logLevel](this);
    }
}

export class RTCreationError extends LoggedError {
    constructor(){
        super();

        this.message = "Error occured while getting RT from server!";

        this.logError();
    }
}