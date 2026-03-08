
import Admin from "@admin/admin/component";
import { AuthQueries } from "@src/lib/apollo-clients/queries/server";
import { notFound } from "next/navigation";
import { serverAC } from "@src/lib/apollo-clients/server";

export default async function Page({ searchParams }){
    const key = (await searchParams).key;
    const { data } = await serverAC.client.query({ query: AuthQueries.adminPanelKey() });

    // if key corresponds current Admin Panel key
    if(key == data.adminPanelKey.data[0]){
        return <Admin /> 
    }
    
    return notFound();
}