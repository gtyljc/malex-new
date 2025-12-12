
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { FormProvider } from "@web/form/ctx"
import { defaultFrontClient } from "@src/apollo-clients/clients";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";

export default function PageWrapper({ children, jwt }){
    return (
        <ApolloProvider client={ defaultFrontClient(jwt)[0] }>
            <FormProvider>
                <Form />                   
                <Header/>
                { children }
                <Footer/>
            </FormProvider>
        </ApolloProvider>
    )
}