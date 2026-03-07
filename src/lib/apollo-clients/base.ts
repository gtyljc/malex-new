
import { 
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache, 
    InMemoryCacheConfig 
} from "@apollo/client";

export default class BaseApolloClient {
    client: ApolloClient;
    link: ApolloLink;

    constructor(
        {
            apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/graphql",
            links = [], // links without HttpLink
            cacheOptions = {} 
        }: { 
            apiUrl?: string,
            links?: ApolloLink[] 
            cacheOptions?: InMemoryCacheConfig
        } = {}
    ){
        const link = ApolloLink.from([ ...links, new HttpLink({ uri: apiUrl }) ]);
        this.client = new ApolloClient(
            { link, cache: new InMemoryCache(cacheOptions) }
        )
        this.link = link;
    }
}