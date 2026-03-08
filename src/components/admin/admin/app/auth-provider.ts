
import { AuthQueries } from "@src/lib/apollo-clients/queries/client";
import { frontendClient } from "@src/lib/apollo-clients/client";
import { ApolloClient } from "@apollo/client";

interface LoginParams {
    username: string,
    password: string
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
            frontendClient.setAuthTokens(
                r.data.adminLogin.data[0].rt,
                r.data.adminLogin.data[0].at
            )

            return { redirectTo: "/" };
        }

        throw new AuthProvider.authError();
    }

    // when the dataProvider returns an error, check if this is an authentication error
    async checkError() {
        return null;
    }
    
    // when the user navigates, make sure that their credentials are still valid
    async checkAuth() {
        
    }
    
    // remove local credentials and notify the auth server that the user logged out
    async logout() {
        
    }
};

export default AuthProvider;