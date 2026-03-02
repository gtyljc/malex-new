
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { FormProvider } from "@web/form/ctx"
import { useFrontendClient } from "@src/lib/apollo-clients/frontend";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";

export default function WebPageBase({ children, authTokens }){
    const { client, isIntialized } = useFrontendClient(authTokens);

    if (!isIntialized) return null;
    
    return (
        <ApolloProvider client={ client }>
            <FormProvider>
                <Form />
                <Header/>
                { children }
                <Footer/>
            </FormProvider>
        </ApolloProvider>
    )
}