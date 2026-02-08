"use client";

// others
import Link from "next/link";
import clsx from "clsx";
import { useContext } from "react";
import { MobileMenuCtx } from "./ctx";
import { HeaderCtx } from "../ctx";

// css
import styles from "./styles.module.css";

// components
import PhoneNumber from "../phone-number/component";

function NavigationLink({ url, label }){
    const { setCurrentPage, currentPage } = useContext(HeaderCtx);

    return (
        <Link 
            href={ url } 
            className={ clsx("text-xl", currentPage == label && "text-dodger-blue!") }
            onClick={ () => setCurrentPage(label) }
        >
            { label }
        </Link>
    )
}

export default function MobileMenu(){
    const { isOpened, closeMenu } = useContext(MobileMenuCtx);

    return (
        <div
            className={
                clsx(
                    "inset-0 flex flex-row justify-end mt-(--header-h) fixed pointer-events-none lg:hidden",
                    isOpened && "pointer-events-auto! bg-graphite/45",
                )
            }
        >
            <div className="grow" onClick={ closeMenu }></div>
            <div 
                className={
                    clsx(
                        styles.menu,
                        isOpened && "right-0!",
                    )
                }
            >
                <nav className="flex flex-col mt-10 gap-10">
                    <NavigationLink url="/" label="Home" />
                    <NavigationLink url="/about-us" label="About Us" />
                    <NavigationLink url="/our-works" label="Our Works" />
                    <NavigationLink url="/contact" label="Contact" />
                </nav>
                <div className="mt-[60px]">
                    <PhoneNumber />
                </div>
            </div>
        </div>
    )
}