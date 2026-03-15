
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { FormProvider } from "@web/form/ctx";
import { useClientAC } from "@src/lib/apollo-clients/client";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";

export default function WebPageBase({ children }){
    const { isInitialized, client } = useClientAC();

    if (!isInitialized) return null;

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