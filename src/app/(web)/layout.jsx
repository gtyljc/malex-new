
// others
import { Plus_Jakarta_Sans } from "next/font/google";
import { getJWT } from "@src/apollo-clients/clients"
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

export default async function RootLayout({ children }){
    return (
        <html lang="en" className={ clsx(plus_jakarta_sans.className, "text-sm") }>
            <head>
                <title>Malex Handyman</title>
            </head>
            <body>
                <PageWrapper jwt={ await getJWT("USER", global.apolloClient) }>
                    { children }
                </PageWrapper>
            </body>
        </html>
    )
}
