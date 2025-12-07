
// others
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

// images
import email from "./email.svg";
import phone from "./phone.svg";
import logo from "./logo.svg";

function NavigationLinksCon({ children }){
    return (
        <div className="flex flex-row gap-10 lg:flex-col">
            { children }
        </div>
    )
}

function NavigationLink({ url, label }){
    return (
        <Link 
            href={ url } 
            className="text-white! text-base font-medium md:hover:text-dodger-blue! md:hover:underline!"
        >
            { label }
        </Link>
    )
}

function ContactData({ icon, alt, value }){
    return (
        <div className="flex flex-row gap-2.5">
            <Image 
                width={ 24 }
                height={ 24 }
                src={ icon } 
                alt={ alt }
            />
            <h1 className="text-white">{ value }</h1>
        </div>
    )
}

export default function Footer(){
    return (
        <footer 
            className="
                w-full flex flex-col items-center bg-graphite pr-(--dft-content-p) 
                pl-(--dft-content-p) pt-[50px] box-border lg:pt-[70px]
            "
        >
            <div 
                className="
                    w-full max-w-[1200px] flex flex-col justify-between items-center 
                    gap-10 box-border mb-10 lg:flex-row lg:mb-20
                "
            >
                <div className="w-full box-border lg:w-[33%] lg:p-0">
                    <Link href="/" className="flex flex-col items-center gap-3">
                        <Image src={ logo } alt="Malex home page" className="w-[120px]" />
                        <h1 className="text-white text-xs font-extralight">Pumbling. Assembling. Mounting</h1>
                    </Link>
                </div>
                <div className="w-full flex flex-col items-center lg:w-[33%] lg:order-3">
                    <div className="flex flex-row justify-center lg:flex-col gap-5">
                        <ContactData icon={ phone } alt="Malex phone" value="+13474101444" />
                        <ContactData icon={ email } alt="Malex email" value="support@malexhandy.com"/>
                    </div>
                </div>
                <nav className="flex flex-row justify-center gap-10 lg:order-2 lg:w-[33%] lg:gap-25">
                    <NavigationLinksCon>
                        <NavigationLink url="/" label="Home" />
                        <NavigationLink url="/about-us" label="About us" />
                    </NavigationLinksCon>
                    <NavigationLinksCon>
                        <NavigationLink url="/our-works" label="Our works" />
                        <NavigationLink url="/contact" label="Contact" />
                    </NavigationLinksCon>
                </nav>
            </div>
            <div className="w-full flex flex-row justify-center pt-5 pb-5 box-border border-t border-white/5 ">
                <span className="text-white text-sm">© 2024 malex handyman</span>
            </div>
        </footer>
    )
}