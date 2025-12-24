
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { FormProvider } from "@web/form/ctx"
import { frontClient } from "@src/apollo-clients/clients";
import { setRTForFront } from "@src/apollo-clients/clients";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";
import { useEffect } from "react";

export default function PageWrapper({ children, authPair }){

    // set auth pair ( RT & AT tokens )
    useEffect(() => { setRTForFront(authPair.rToken, authPair.token) });

    return (
        <ApolloProvider client={ frontClient().client  }>
            <FormProvider>
                <Form />
                <Header/>
                { children }
                <Footer/>
            </FormProvider>
        </ApolloProvider>
    )
}