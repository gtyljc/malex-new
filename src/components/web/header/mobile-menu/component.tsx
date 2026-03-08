"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { MobileMenuCtx } from "./ctx";

// css
import styles from "./styles.module.css";

// components
import PhoneNumber from "../phone-number/component";
import { NavigationLink } from "../component";

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
                    <NavigationLink url="/" />
                    <NavigationLink url="/about-us" />
                    <NavigationLink url="/our-works" />
                    <NavigationLink url="/contact" />
                </nav>
                <div className="mt-[60px]">
                    <PhoneNumber />
                </div>
            </div>
        </div>
    )
}