

// here is all possible GraphQL queries that can be executed at frontend and also at backend

import { gql } from "@apollo/client";
export * as adminQueries from "./admin";
export * as webQueries from "./web";

export class AuthQueries {
    static adminPanelKey(){
        return gql`
            query adminPanelKey {
                adminPanelKey {
                    code
                    success
                    message
                    data
                }
            }
        `
    }
}