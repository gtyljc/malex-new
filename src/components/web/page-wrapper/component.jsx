
"use client";

// others
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { FormProvider } from "@web/form/ctx";
import { SetContextLink } from "@apollo/client/link/context";

// components
import Header from "@web/header/component";
import Footer from "@web/footer/component";
import Form from "@web/form/component";

export default function PageWrapper({ children, jwt }){
    const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });
    const authLink = new SetContextLink(
        ({ headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${jwt}`
                }
            }
        }
    );

    return (
        <ApolloProvider 
            client={ 
                new ApolloClient(
                    {
                        link: authLink.concat(httpLink),
                        cache: new InMemoryCache()
                        
                    }
                ) 
            }
        >
            <FormProvider>
                <Form />                   
                <Header/>
                { children }
                <Footer/>
            </FormProvider>
        </ApolloProvider>
    )
}