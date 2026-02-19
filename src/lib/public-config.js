
import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { SiteConfigQueries } from "./apollo-clients/queries/frontend";
import { frontendClient } from "./apollo-clients/frontend";

export function usePublicConfig(){
    frontendClient.client.query({ query: SiteConfigQueries.publicConfig() }).then(() => {})

    return useMemo(() => ({ data }));
}