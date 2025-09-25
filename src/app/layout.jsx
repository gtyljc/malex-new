
// tools
import { Plus_Jakarta_Sans} from "next/font/google";

// components
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import MainForm from "@/components/main-form/main-form";
import { MainFormProvider } from "@/components/main-form/ctx";

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
                <MainFormProvider>
                    <MainForm/>                    
                    <Header/>
                    {children}
                    {/* <Footer/> */}
                </MainFormProvider>
            </body>
        </html>
    )
}
