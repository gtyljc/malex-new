
// tools
import { Plus_Jakarta_Sans} from "next/font/google";


// font settings
const plus_jakarta_sans = Plus_Jakarta_Sans(
    {
        weight: ['400', '600', '700'],
        subsets: ["latin"],
        variable: "--malex-font"
    }
);

export default function AdminLayout({ children }){
    return (
        <html lang="en" className={plus_jakarta_sans.className}>
            <body>
                {children}
            </body>
        </html>
    )
}
