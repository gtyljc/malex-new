
// tools
import { Plus_Jakarta_Sans} from "next/font/google";

// components
import Header from "@components/header/component";
import Footer from "@components/footer/component";
import MainForm from "@components/main-form/component";
import { MainFormProviders } from "@components/main-form/ctx";

// css
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
                <MainFormProviders>
                    <MainForm/>                    
                    <Header/>
                    {children}
                    <Footer/>
                </MainFormProviders>
            </body>
        </html>
    )
}
