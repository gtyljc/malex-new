
// tools
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

// components
import Logo from "@/components/logo/logo";
import CallIcon from "@/components/call-icon/call-icon";

// css
import styles from "./footer.module.css";

// images
import email_svg from "./email.svg";

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <Link href="/" className={styles.logo_wrapper}>
                        <Logo color="#FFFFFF"/>
                        <h1>Pumbling. Assembling. Mounting</h1>
                    </Link>
                    <nav className={styles.navigation}>
                        <div className={styles.navigation_col}>
                            <Link href="/"  className={
                                clsx(
                                    styles.navi_link,
                                    "s_link"
                                )
                            }>Home</Link>
                            <Link href="/about-us"  className={
                                clsx(
                                    styles.navi_link,
                                    "s_link"
                                )
                            }>About us</Link>
                        </div>
                        <div className={styles.navigation_col}>
                            <Link href="/our-works"  className={
                                clsx(
                                    styles.navi_link,
                                    "s_link"
                                )
                            }>Our works</Link>
                            <Link href="/contact"  className={
                                clsx(
                                    styles.navi_link,
                                    "s_link"
                                )
                            }>Contact</Link>
                        </div>
                    </nav>
                    <div className={styles.contact_con}>
                        <div className={styles.contact_row}>
                            <CallIcon color="#FFFFFF"/>
                            <h1 className={styles.contact}>+13474101444</h1>
                        </div>
                        <div className={styles.contact_row}>
                            <Image 
                                width={24}
                                height={24}
                                src={email_svg} 
                                alt="Malex support email"
                            />
                            <h1 className={styles.contact}>support@malexhandy.com</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <span>© 2024 malex handyman</span>
                </div>
            </div>
        </footer>
    )
}