"use client";

// others
import { Plus_Jakarta_Sans} from "next/font/google";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import clsx from "clsx";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";
import { FormProvider } from "@web/form/ctx";

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
const gqlClient =  new ApolloClient(
    {
        link: new HttpLink({uri: "http://localhost:2000"}),
        cache: new InMemoryCache()
    }
)

// add GraphQL client to global
if (!global.gqlClient){
    global.gqlClient = gqlClient;
}

export default function RootLayout({ children }){
    return (
        <html lang="en" className={ clsx(plus_jakarta_sans.className, "text-sm") }>
            <body>
                <ApolloProvider client={ gqlClient }>
                    <FormProvider>
                        <Form/>                    
                        <Header/>
                        { children }
                        <Footer/>
                    </FormProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}
