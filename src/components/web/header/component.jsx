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

// components
import MobileMenu from "@web/header/mobile-menu/component";

// images
import logo from "./logo.svg";
import mobile from "./mobile.svg";
import phone from "./phone.svg";

function NavigationLink({ url, label }){
    return (
        <Link href={ url } className="text-base font-medium hover:text-dodger-blue! hover:underline!">
            { label }
        </Link>
    )
}

function HeaderContent() {
    const { toggleMenu } = useContext(MobileMenuCtx);
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
                        <NavigationLink url="/" label="Home" />
                        <NavigationLink url="/about-us" label="About Us" />
                        <NavigationLink url="/our-works" label="Our works" />
                        <NavigationLink url="/contact" label="Contact" />
                    </nav>
                </div> 
                <div className="flex flex-row gap-8">
                    <div className="hidden md:flex flex-row items-center gap-3">
                        <Image
                            width={ 30 }
                            src={ phone }
                            alt="Malex contact phone number"
                        />
                        <h1 className="font-semibold text-lg">3474101444</h1>
                    </div>        
                    <div className="flex flex-row justify-end items-center gap-5">
                        <button 
                            className="redirect-btn redirect-btn-blue min-w-[180px] md:min-w-[220px]"
                            onClick={ openForm }
                        >
                            <span>Make an appointment</span>
                        </button>
                        <button
                            className="svg-btn lg:hidden"
                            onClick={ toggleMenu }
                        >
                            <Image
                                width={28}
                                height={28}
                                src={ mobile } 
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
            <HeaderContent />
        </MobileMenuProvider>
    )
}