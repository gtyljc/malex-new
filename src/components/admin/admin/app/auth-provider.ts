
import { 
    AdminLoginDocument, 
    CheckAdminDocument, 
    AdminLogoutDocument
} from "@src/lib/apollo-clients/queries/Auth.generated";
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
        this.redirectTo = "/login";

        console.error(this);
    }
}

class AuthProvider {
    apolloClient: ApolloClient;

    constructor(apolloClient: ApolloClient){
        this.apolloClient = apolloClient;
    }

    // send username and password to the auth server and get back credentials
    async login({ username, password }: LoginParams) {        
        const r = await this.apolloClient.mutate(
            {
                mutation: AdminLoginDocument,
                variables: { username, password }
            }
        );

        if(!r.data.adminLogin.data[0] == false){
            throw new AuthError("Not authenticated! Are you sure that you are admin?)");
        }

        return { redirectTo: "/" };
    }

    // when the dataProvider returns an error, check if this is an authentication error
    async checkError(error: Error) {
        if (error instanceof DataProviderError){
            if (error.code == 403){
                throw new AuthError("Can't load resource, because of permissions!");
            }
        }
    }
    
    // when the user navigates, make sure that their credentials are still valid
    async checkAuth() {
        this.apolloClient.cache.evict({ fieldName: "checkAdmin" });

        this.apolloClient.cache.gc();

        const r = await this.apolloClient.query({ query: CheckAdminDocument });

        if ((r.error || !r.data.checkAdmin.success) && r.data.checkAdmin.code != 403) {
            throw new AuthError("Authentication has failed!");
        }

        if (r.data.checkAdmin.data[0] == false){
            throw new AuthError("Can't identicate you as admin!");
        }
    }
    
    // remove local credentials and notify the auth server that the user logged out
    async logout() {
        await this.apolloClient.mutate({ mutation: AdminLogoutDocument });

        return "/login";
    }
};

export default AuthProvider;