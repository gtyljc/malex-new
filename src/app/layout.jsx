
// tools
import { Plus_Jakarta_Sans} from "next/font/google";

// content
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "./global.css";

// font settings
const plus_jakarta_sans = Plus_Jakarta_Sans(
    {
        weight: ['400', '600', '700'],
        subsets: ["latin"],
        variable: "--malex-font"
    }
);

export default function RootLayout({ children }){
    return (
        <html lang="en" className={plus_jakarta_sans.className}>
            <body>
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
