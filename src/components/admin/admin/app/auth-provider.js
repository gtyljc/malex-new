
import { jwtVerify, decodeJwt } from "jose";
import { AuthQueries } from "@lib/apollo-clients/queries/frontend";
import FrontendApolloClient from "@lib/apollo-clients/frontend";

class AuthProvider {
    constructor(apolloClient){
        this.apolloClient = apolloClient;
    }

    static authError = class AuthenticationError extends Error {
        message = "Not authorized!";
        redirectTo = "/login";
    }

    async _auth(username, password){
        const r = await this.apolloClient.mutate(
            {
                mutation: AuthQueries.adminLogin(),
                variables: { username, password }
            }
        );

        // validation successful
        if(r.data.adminLogin.success){
            FrontendApolloClient.setAuthTokens(
                r.data.adminLogin.data[0].rt,
                r.data.adminLogin.data[0].at
            )

            return { redirectTo: "/" };
        }

        throw new AuthProvider.authError();
    }

    // send username and password to the auth server and get back credentials
    async login({ username, password }) {
        const { at } = FrontendApolloClient.getAuthTokens();

        if (at){

            // if admin token is too old and need to be refreshed
            try { 
                await jwtVerify(at)
                
                return { redirectTo: "/" };
            }
            catch { await this._auth(username, password) }
        }
        else {
            await this._auth(username, password);
        }
    }

    // when the dataProvider returns an error, check if this is an authentication error
    async checkError() {
        return null;
    }
    
    // when the user navigates, make sure that their credentials are still valid
    async checkAuth() {
        const { at } = FrontendApolloClient.getAuthTokens();

        if (!at) {
            throw new AuthProvider.authError()
        }
        else {
            const claims = decodeJwt(at);

            // if it's "user" token
            if (claims.aud != "ADMIN") throw new AuthProvider.authError();
        }
    }
    
    // remove local credentials and notify the auth server that the user logged out
    async logout() {
        const authPair = FrontendApolloClient.getAuthTokens();
        
        if(authPair.a_token && authPair.r_token){
            const claims = decodeJwt(authPair.a_token);

            if(claims.aud == "ADMIN"){
                const r = await this.apolloClient.mutate({ mutation: AuthQueries.adminLogout() });

                FrontendApolloClient.setAuthTokens(
                    r.data.adminLogout.data[0].at,
                    r.data.adminLogout.data[0].rt
                )
            }
        }
    }
};

export default AuthProvider;