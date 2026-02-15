
import Admin from "@admin/admin/component";
import { createAuthTokensForFrontend } from "@lib/apollo-clients/backend";
import { AuthQueries } from "@lib/apollo-clients/queries/backend";
import NotFound from "@app/not-found";

export default async function Page({ searchParams }){
    const key = (await searchParams).key;
    const { data } = await global.apolloClient.query({ query: AuthQueries.adminPanelKey() });

    // if key corresponds current Admin Panel key
    if(key == data.adminPanelKey.data[0]){
        return <Admin authTokens={ await createAuthTokensForFrontend() } /> 
    }
    
    return <NotFound />
}