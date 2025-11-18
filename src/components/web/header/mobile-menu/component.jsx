"use client";

// others
import Link from "next/link";
import clsx from "clsx";
import { useContext } from "react";
import { MobileMenuCtx } from "./ctx";
import Image from "next/image";

// css
import styles from "./styles.module.css";

// images
import phone from "../phone.svg";

function NavigationLink({ url, label }){
    return (
        <Link href={ url } className="text-xl">
            { label }
        </Link>
    )
}

export default function MobileMenu(){
    const { isOpened } = useContext(MobileMenuCtx);

    return (
        <div
            className={
                clsx(
                    "inset-0 flex flex-row justify-end mt-(--header-h) fixed pointer-events-none",
                    isOpened && "pointer-events-auto! bg-graphite/45",
                )
            }
        >
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
                <div className="flex flex-row items-center gap-3 mt-[50px]">
                    <Image
                        width={ 30 }
                        src={ phone }
                        alt="Malex contact phone number"
                    />
                    <h1 className="font-semibold text-lg">3474101444</h1>
                </div>
            </div>
        </div>
    )
}