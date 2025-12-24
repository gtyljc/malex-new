
import { jwtVerify, decodeJwt } from "jose";
import { AuthQueries } from "@src/apollo-clients/requests/front-requests";
import { setAuthPairLocal, getAuthPairLocal } from "@src/apollo-clients/clients";

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
            setAuthPairLocal(
                r.data.adminLogin.data[0].r_token,
                r.data.adminLogin.data[0].token
            )

            return { redirectTo: "/" };
        }

        throw new AuthProvider.authError();
    }

    // send username and password to the auth server and get back credentials
    async login({ username, password }) {
        const { token } = getAuthPairLocal();

        // console.log("kwodkdwkl")

        if (token){

            // if token is too old and need to be refreshed
            try { 
                await jwtVerify(token)
                
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
        const { token } = getAuthPairLocal();

        if (!token) {
            throw new AuthProvider.authError()
        }
        else {
            const claims = decodeJwt(token);

            // if it's "user" token
            if (claims.aud != "ADMIN") throw new AuthProvider.authError();
        }
    }
    
    // remove local credentials and notify the auth server that the user logged out
    async logout() {
        const authPair = getAuthPairLocal();
        
        if(authPair.token && authPair.rToken){
            const claims = decodeJwt(authPair.rToken);

            if(claims.aud == "ADMIN"){
                const r = await this.apolloClient.mutate({ mutation: AuthQueries.adminLogout() });

                setAuthPairLocal(
                    r.data.adminLogout.data[0].r_token,
                    r.data.adminLogout.data[0].token
                )
            }
        }
    }
};

export default AuthProvider;