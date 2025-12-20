
import Admin from "@admin/admin/component";
import { getAuthPair } from "@src/apollo-clients/clients";

export default async function Page(){ 
    return <Admin authPair={ await getAuthPair("USER") } /> 
}