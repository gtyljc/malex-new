
import Admin from "@admin/admin/component";
import { createAuthTokens } from "@lib/apollo-clients/backend";
import { AuthQueries } from "@lib/apollo-clients/queries/backend";
import { backendClient } from "@lib/apollo-clients/backend";
import { notFound } from "next/navigation";

export default async function Page({ searchParams }){
    const key = (await searchParams).key;
    const { data } = await backendClient.client.query({ query: AuthQueries.adminPanelKey() });

    // if key corresponds current Admin Panel key
    if(key == data.adminPanelKey.data[0]){
        return <Admin authTokens={ await createAuthTokens() } /> 
    }
    
    return notFound();
}