
import Admin from "@admin/admin/component";
import { AdminPanelKeyDocument } from "@src/lib/apollo-clients/queries/Auth.generated"; 
import { notFound } from "next/navigation";
import { serverAC } from "@src/lib/apollo-clients/server";
import { Suspense } from "react";

async function AdminLoader({ searchParams }){
    const key = (await searchParams).key;
    const { data } = await serverAC.client.query({ query: AdminPanelKeyDocument });

    console.log(data);

    // if key corresponds current Admin Panel key
    if(key == data.adminPanelKey.data[0]){
        return <Admin /> 
    }

    return notFound();
}

export default async function Page({ searchParams }){
    return (
        <Suspense fallback="">
            <AdminLoader searchParams={ searchParams }/>
        </Suspense>
    )
}