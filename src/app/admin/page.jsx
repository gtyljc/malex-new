
import Admin from "@admin/admin/component";
import { getAuthPair } from "@src/apollo-clients/clients";
import { nanoid } from "nanoid";

export default async function Page(){ 
    return <Admin authPair={ await getAuthPair(nanoid(16), "GUEST") } /> 
}