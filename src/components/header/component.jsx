"use client";

// tools
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useContext } from "react";
import { MainFormOpenCtx } from "@components/main-form/ctx";
import { MobileMenuProvider, MobileMenuCtx } from "@components/mobile-menu/ctx";

// components
import RedirectButton from "@components/redirect-btn/component";
import Logo from "@components/logo/component";
import CallIcon from "@components/call-icon/component";
import MobileMenu from "@components/mobile-menu/component";

// css
import styles from "./styles.module.css";

// images
import mobile_svg from "./mobile.svg";


function _Header() {
    const { openForm } = useContext(MainFormOpenCtx);
    const { toggleMenu } = useContext(MobileMenuCtx);

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
                    }>
                        Home
                    </Link>
                    <Link href="/about-us" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>
                        About us
                    </Link>
                    <Link href="/our-works" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>
                        Our works
                    </Link>
                    <Link href="/contact" className={
                        clsx(
                            styles.navi_link,
                            "s_link"
                        )
                    }>
                        Contact
                    </Link>
                </nav>
                <div className={styles.left}>
                    <div className={styles.contact_row}>
                        <CallIcon/>
                        <h1 className={styles.contact}>+13474101444</h1>
                    </div>        
                    <div className={styles.interactive}>
                        <RedirectButton 
                            label={"Make an appointment"}
                            onClick={openForm} 
                        />
                        <button 
                            className={styles.m_menu_btn}
                            onClick={toggleMenu}
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
            <MobileMenu/>
        </header>
    );
}

export default function Header(){
    return (
        <MobileMenuProvider>
            <_Header/>
        </MobileMenuProvider>
    )
}