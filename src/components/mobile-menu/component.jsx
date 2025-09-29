"use client";

// tools
import Link from "next/link";
import clsx from "clsx";

// components
import CallIcon from "../call-icon/component";
import { useContext } from "react";
import { MobileMenuCtx } from "./ctx";

// css
import styles from "./styles.module.css";


export default function MobileMenu(){
    const { isOpened } = useContext(MobileMenuCtx);
    
    return (
        <div
            className={
                clsx(
                    styles.overlap,
                    !isOpened && styles.overlap_closed,
                )
            }
        >
            <div 
                className={
                    clsx(
                        styles.menu,
                        !isOpened && styles.menu_closed,
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