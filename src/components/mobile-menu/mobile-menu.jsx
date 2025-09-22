
// components
import CallIcon from "../call-icon/call-icon"
import { createContext, useContext, useState } from "react"

// css
import styles from "./mobile-menu.module.css"

const MobileMenuCtx = createContext();

export function MobileMenuProvider({children}) {
    const [isOpened, changeState] = useState(false);

    return (
        <MobileMenuCtx value={{isOpened, changeState}}>
            {children}
        </MobileMenuCtx>
    )
}

export function useMobileMenuCtx(){
    return useContext(MobileMenuCtx);
}

export default function MobileMenu(){
    return (
        <div
            className={
                clsx(
                    styles.overlap,
                    !menuState && styles.overlap_closed,
                )
            }
        >
            <div 
                className={
                    clsx(
                        styles.menu,
                        !menuState && styles.menu_closed,
                    )
                }
            >
                <nav className={styles.navigation}>
                    <Link href="/" className={styles.navi_link}>Home</Link>
                    <Link href="/about-us" className={styles.navi_link}>About us</Link>
                    <Link href="/our-works" className={styles.navi_link}>Our works</Link>
                    <Link href="/contact" className={styles.navi_link}>Contact</Link>
                </nav>
                <div className={styles.contact_row}>
                    <CallIcon/>
                    <h1 className={styles.contact}>+13474101444</h1>
                </div>
            </div>
        </div>
    )
}