
import { createAuthTokens } from "@lib/apollo-clients/backend";
import { Plus_Jakarta_Sans } from "next/font/google";
import clsx from "clsx";

// components
import WebPageBase from "@web/web-page-base/component";

// css
import "@app/global.css";

// font settings
const plus_jakarta_sans = Plus_Jakarta_Sans(
    {
        weight: [ "400", "500", "600", "700" ],
        subsets: [ "latin" ],
        variable: "--malex-font"
    }
);

export default async function WebLayout({ children }) {
    return (
        <html lang="en" className={ clsx(plus_jakarta_sans.className, "web", "text-sm") }>
            <head>
                <title>Malex Handyman</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <WebPageBase authTokens={ await createAuthTokens() }>
                    { children }
                </WebPageBase>
            </body>
        </html>
    )
}