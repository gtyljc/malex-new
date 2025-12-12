
import Admin from "@admin/admin/component";
import { getJWT } from "@src/apollo-clients/clients";

export default async function Page(){ 
    return <Admin jwt={ await getJWT("USER", global.apolloClient) } /> 
}