"use client";

// others
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FormCtx } from "@web/form/ctx";
import { 
    MobileMenuProvider,
    MobileMenuCtx 
} from "@web/header/mobile-menu/ctx";
import { HeaderCtx, HeaderProvider } from "./ctx";
import clsx from "clsx";

// components
import MobileMenu from "@web/header/mobile-menu/component";
import PhoneNumber from "./phone-number/component";

// images
import logo from "./logo.svg";
import mobile from "./mobile.svg";
import close from "./close.svg";

function NavigationLink({ url, label }){
    const { setCurrentPage, currentPage } = useContext(HeaderCtx);

    return (
        <Link
            href={ url }
            className={
                clsx(
                    "text-base font-medium hover:text-dodger-blue! hover:underline!", 
                    currentPage == label && "text-dodger-blue!"
                )
            }
            onClick={ () => setCurrentPage(label) }
        >
            { label }
        </Link>
    );
}

function HeaderContent() {
    const { toggleMenu, closeMenu, isOpened } = useContext(MobileMenuCtx);
    const { openForm} = useContext(FormCtx);

    return (
        <HeaderProvider>
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
                            <NavigationLink url="/" label="Home" />
                            <NavigationLink url="/about-us" label="About Us" />
                            <NavigationLink url="/our-works" label="Our works" />
                            <NavigationLink url="/contact" label="Contact" />
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
                                className="svg-btn lg:hidden "
                                onClick={ toggleMenu }
                            >
                                <div>
                                    <Image
                                        width={28}
                                        height={28}
                                        src={ mobile } 
                                        alt="Navigation menu" 
                                    />
                                    <Image
                                        width={28}
                                        height={28}
                                        src={ close } 
                                        alt="Navigation menu" 
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <MobileMenu/>
            </header>
        </HeaderProvider>
    );
}

export default function Header(){
    return (
        <MobileMenuProvider>
            <HeaderContent />
        </MobileMenuProvider>
    )
}