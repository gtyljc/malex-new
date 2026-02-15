
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { FormProvider } from "@web/form/ctx"
import FrontendApolloClient from "@lib/apollo-clients/frontend";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";
import { useEffect } from "react";

export default function WebPageBase({ children, authTokens }){
    useEffect(() => { FrontendApolloClient.initTokens(authTokens.at, authTokens.rt) })

    return (
        <ApolloProvider client={ new FrontendApolloClient().init().client }>
            <FormProvider>
                <Form />
                <Header/>
                { children }
                <Footer/>
            </FormProvider>
        </ApolloProvider>
    )
}