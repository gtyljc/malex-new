"use client";

// others
import { Plus_Jakarta_Sans} from "next/font/google";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

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
        weight: ['400', '600', '700'],
        subsets: ["latin"],
        variable: "--malex-font"
    }
);
const gql_client = !global.gql_client ? new ApolloClient(
    {
        link: new HttpLink({uri: "http://localhost:2000"}),
        cache: new InMemoryCache()
    }
): global.gql_client;

global.gql_client = gql_client;

export default function RootLayout({ children }){
    return (
        <html lang="en" className={plus_jakarta_sans.className}>
            <body>
                <ApolloProvider client={global.gql_client}>
                    <FormProvider>
                        <Form/>                    
                        <Header/>
                        {children}
                        <Footer/>
                    </FormProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}
