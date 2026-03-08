"use client";

// others
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FormCtx } from "@web/form/ctx";
import { MobileMenuProvider, MobileMenuCtx } from "@web/header/mobile-menu/ctx";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import * as tools from "@lib/tools";

// components
import MobileMenu from "@web/header/mobile-menu/component";
import PhoneNumber from "./phone-number/component";

// images
import logo from "./logo.svg";
import mobile from "./mobile.svg";
import close from "./close.svg";

interface CardSideParams {
    children?: React.ReactNode,
    className?: string
}

function CardSide({ children, className }: CardSideParams){
    return (
        <span className={ 
            clsx(
                    "absolute size-full backface-hidden bg-white flex flex-col justify-center items-center select-none", 
                    className
                ) 
            }
        >
            { children }
        </span>
    )
}

interface NavigationLinkParams {
    url: string
}

export function NavigationLink({ url }: NavigationLinkParams){
    const pathname = usePathname();

    return (
        <Link
            href={ url }
            className={
                clsx(
                    "text-lg font-medium hover:text-dodger-blue! hover:underline! lg:text-base", 
                    url == pathname && "text-dodger-blue!"
                )
            }
        >
            { url.replace("/", "").split("-").map(e => e == "" ? "Home": tools.capitalize(e)).join(" ") }
        </Link>
    );
}

function HeaderContent() {
    const { toggleMenu, closeMenu, isOpened } = useContext(MobileMenuCtx);
    const { openForm } = useContext(FormCtx);

    return (
        <header className="w-full h-(--header-h) flex flex-row justify-center bg-white fixed z-100">
            <div className="max-w-[1200px] w-full flex flex-row justify-between items-center  pr-(--dft-content-p) pl-(--dft-content-p) box-border">
                <div className="flex flex-row items-center gap-20">
                    <Link href="/">
                        <Image
                            className="w-[110px] md:w-[130px]"
                            src={ logo } 
                            alt="Malex logo" 
                        />
                    </Link>
                    <nav className="hidden lg:flex flex-row gap-13">
                        <NavigationLink url="/" />
                        <NavigationLink url="/about-us" />
                        <NavigationLink url="/our-works" />
                        <NavigationLink url="/contact" />
                    </nav>
                </div> 
                <div className="flex flex-row gap-8">
                    <div className="hidden lg:flex flex-col justify-center">
                        <PhoneNumber />
                    </div>       
                    <div className="flex flex-row justify-end items-center gap-5">
                        <button 
                            className="redirect-btn redirect-btn-blue min-w-[180px] md:min-w-[220px]"
                            onClick={ () => { if (isOpened) { closeMenu() }; openForm(); } }
                        >
                            <span>Make an appointment</span>
                        </button>
                        <button
                            className="svg-btn lg:hidden perspective-[1000px] size-[42px]"
                            onClick={ toggleMenu }
                        >
                            <div className={ clsx("size-full transform-3d relative transition-all ease-in", isOpened && "rotate-y-180") }>
                                <CardSide>
                                    <Image
                                        width={28}
                                        height={28}
                                        src={ mobile } 
                                        alt="Navigation menu"
                                    />
                                </CardSide>
                                <CardSide className="rotate-y-180">
                                    <Image
                                        width={28}
                                        height={28}
                                        src={ close } 
                                        alt="Navigation menu" 
                                    />
                                </CardSide>
                            </div>
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
            <HeaderContent />
        </MobileMenuProvider>
    )
}