
import { AuthQueries } from "@src/lib/apollo-clients/queries/server";
import { ApolloClient } from "@apollo/client";
import { DataProviderError } from "./data-provider";

interface LoginParams {
    username: string,
    password: string
}

class AuthError extends Error {
    redirectTo: string | boolean;
    
    constructor(message: string){
        super();

        this.message = message;
        this.redirectTo = false;
    }
}

class AuthProvider {
    apolloClient: ApolloClient;

    constructor(apolloClient: ApolloClient){
        this.apolloClient = apolloClient;
    }

    static authError = class AuthenticationError extends Error {
        message = "Not authorized!";
        redirectTo = "/login";
    }

    // send username and password to the auth server and get back credentials
    async login({ username, password }: LoginParams) {
        const r = await this.apolloClient.mutate(
            {
                mutation: AuthQueries.adminLogin(),
                variables: { username, password }
            }
        );

        // validation successful
        if(r.data.adminLogin.success){
            return { redirectTo: "/" };
        }

        throw new AuthProvider.authError();
    }

    // when the dataProvider returns an error, check if this is an authentication error
    async checkError(error: Error) {
        if (error instanceof DataProviderError){
            if (error.code == 403){
                throw new Error();
            }
        }
    }
    
    // when the user navigates, make sure that their credentials are still valid
    async checkAuth() {
        const r = await this.apolloClient.query({ query: AuthQueries.checkAdmin() });
    
        if (r.error || (!r.data.checkAdmin.success && r.data.checkAdmin.code != 403)){
            throw new AuthError("Authentication has failed! Try one more time later.");
        }

        if (r.data.checkAdmin.code == 403){
            throw new AuthError("Not authenticated! Are you sure that you are admin?)");
        }
    }
    
    // remove local credentials and notify the auth server that the user logged out
    async logout() {
        await this.apolloClient.mutate({ mutation: AuthQueries.adminLogout() });
    }
};

export default AuthProvider;