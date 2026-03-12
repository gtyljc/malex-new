
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { FormProvider } from "@web/form/ctx";
import { clientAC, useConfig } from "@src/lib/apollo-clients/client";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";

export default function WebPageBase({ children }){
    const { isConfigLoaded } = useConfig();

    if (!isConfigLoaded) return null;

    return (
        <ApolloProvider client={ clientAC.client }>
            <FormProvider>
                <Form />
                <Header/>
                { children }
                <Footer/>
            </FormProvider>
        </ApolloProvider>
    )
}