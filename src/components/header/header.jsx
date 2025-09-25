
// tools
import Link from "next/link";
import clsx from "clsx";

// components
import RedirectButton from "@/components/redirect-btn/redirect-btn";
import Logo from "@/components/logo/logo";
import CallIcon from "@/components/call-icon/call-icon";
import MobileMenuBtn from "@/components/mobile-menu-btn/mobile-menu-btn";

// css
import styles from "./header.module.css"


export default function Header(){
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link href="/">
                    <Logo/>
                </Link>
                <nav className={styles.navigation}>
                    <Link href="/" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>Home</Link>
                    <Link href="/about" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>About us</Link>
                    <Link href="/our-works" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>Our works</Link>
                    <Link href="/contact" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>Contact</Link>
                </nav>
                <div className={styles.left}>
                    <div className={styles.contact_row}>
                        <CallIcon/>
                        <h1 className={styles.contact}>+13474101444</h1>
                    </div>        
                    <div className={styles.interactive}>
                        <RedirectButton 
                            label={"Make an appointment"}
                            onClick={}    
                        />
                        <MobileMenuBtn
                            
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}