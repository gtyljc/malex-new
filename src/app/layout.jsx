
// tools
import { Plus_Jakarta_Sans} from "next/font/google";

// components
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { AppointmentFormProvider } from "@/components/appointment-form/appointment-form";

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
                <AppointmentFormProvider>
                    <Header/>
                    {children}
                    {/* <Footer/> */}
                </AppointmentFormProvider>
            </body>
        </html>
    )
}
