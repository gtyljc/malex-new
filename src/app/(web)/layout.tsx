
import { Plus_Jakarta_Sans } from "next/font/google";
import clsx from "clsx";
import WebPageWrapper from "@web/web-page-base/component";

// css
import "@app/global.css";

// font settings
const plusJakaraSans= Plus_Jakarta_Sans(
    {
        weight: [ "400", "500", "600", "700" ],
        subsets: [ "latin" ],
        variable: "--malex-font"
    }
);

export default async function WebLayout({ children }: { children: React.ReactNode }) {    
    return (
        <html lang="en" className={ clsx(plusJakaraSans.className, "web", "text-sm") }>
            <head>
                <title>Malex Handyman</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <WebPageWrapper>
                    { children }
                </WebPageWrapper>
            </body>
        </html>
    )
}