
// others
import { Plus_Jakarta_Sans } from "next/font/google";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { AuthQueries } from "@src/server-requests";
import clsx from "clsx";

// components
import PageWrapper from "@web/page-wrapper/component";

// css
import "./global.css";

// font settings
const plus_jakarta_sans = Plus_Jakarta_Sans(
    {
        weight: [ "400", "500", "600", "700" ],
        subsets: [ "latin" ],
        variable: "--malex-font"
    }
);

// add GraphQL client to global, that will be used at backend
if (global.apolloClient === undefined){
    global.apolloClient = new ApolloClient(
        {
            link: new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL }),
            cache: new InMemoryCache()
        }
    );
}

export default async function RootLayout({ children }){
    const jwt = (
        await global.apolloClient.mutate(
            {
                mutation: AuthQueries.createJWT(),
                variables: { role: "USER" } 
            }
        )
    ).data["createJWT"].data[0].token;

    return (
        <html lang="en" className={ clsx(plus_jakarta_sans.className, "text-sm") }>
            <body>
                <PageWrapper jwt={ jwt }>
                    { children }
                </PageWrapper>
            </body>
        </html>
    )
}
