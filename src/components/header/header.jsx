"use client"


// tools
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

// components
import RedirectButton from "@/components/redirect-btn/redirect-btn";
import Logo from "@/components/logo/logo";
import CallIcon from "@/components/call-icon/call-icon";

// css
import styles from "./header.module.css"

// images
import mobile_svg from "./mobile.svg";

export default function Header(){

    // mobile_navigation_btn hook
    const [menuState, changeMenuState] = useState(false); // true => opened / false => closed

    function handleMobileNavigationBtnClick() {

        // if menu is opened, than close it
        if (menuState){
            changeMenuState(false);
        }

        // if menu is closed, than close it
        else {
            changeMenuState(true);
        }
    }

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
                        <RedirectButton label={"Make an appointment"}/>
                        <button 
                            className={styles.mobile_menu_btn}
                            onClick={handleMobileNavigationBtnClick}
                        >
                            <Image 
                                width={28}
                                height={28}
                                src={mobile_svg} 
                                alt="Navigation menu" 
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}