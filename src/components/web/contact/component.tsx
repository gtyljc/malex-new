
"use client";

// others
import Image from "next/image";
import { dayjs } from "@lib/dayjs/client";
import { useConfig } from "@src/lib/apollo-clients/client";

// components
import PathToPageSection from "@web/path-to-page/component";
import FormPreviewSection from "@web/form-preview/component";

// images
import thumbnail from "./thumbnail.jpg";
import phone from "./phone.svg";
import email from "./email.svg";
import time from "./time.svg";

interface ContactDataFieldParams {
    children: React.ReactElement,
    icon: string
}

function ContactDataField({ children, icon }: ContactDataFieldParams){
    return (
        <li className="flex flex-row items-center gap-3">
            <Image src={ icon } alt="Malex contact" className="lg:size-[32px]" />
            { children }
        </li>
    )
}

interface PhoneNumberFieldParams {
    phoneValue: string;
}

function PhoneNumberField({ phoneValue }: PhoneNumberFieldParams){
    return (
        <ContactDataField icon={ phone }>
            <span className="font-semibold lg:text-lg">{ phoneValue }</span>
        </ContactDataField>
    )
}

interface SupportEmailFieldParams {
    emailValue: string;
}

function SupportEmailField({ emailValue }: SupportEmailFieldParams){
    return (
        <ContactDataField icon={ email }>
            <span className="font-semibold lg:text-lg">{ emailValue }</span>
        </ContactDataField>
    )
}

interface WorkTimeFieldParams {
    openingAtValue: string;
    closingAtValue: string;
}

function WorkTimeField({ openingAtValue, closingAtValue }: WorkTimeFieldParams){
    return (
        <ContactDataField icon={ time }>
            <span className="font-semibold lg:text-lg">
                { `Mon-Fri: ${ openingAtValue } - ${ closingAtValue }, Sat-Sun: Closed` }
            </span>
        </ContactDataField>
    )
}

export default function Contact(){
    const { siteConfig } = useConfig();

    return (
        <main>
            <PathToPageSection pageName="Contact" />
            <section className="w-full flex flex-col items-center">
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:w-full">
                    <div className="w-full max-w-[470px] flex flex-col gap-5">
                        <h1 className="section-title">Contact</h1>
                        <div className="w-full flex flex-col md:order-2 gap-10">
                            <p>We’re always ready to answer your questions and offer the assistance you need</p>
                            <ul className="flex flex-col gap-6 mb-5 md:mb-0">
                                <PhoneNumberField phoneValue={ siteConfig.phoneNumber } />
                                <SupportEmailField emailValue={ siteConfig.supportEmail } />
                                <WorkTimeField 
                                    openingAtValue={ dayjs(siteConfig.openingAt).format("LT") } 
                                    closingAtValue={ dayjs(siteConfig.closingAt).format("LT") } 
                                />
                            </ul>
                        </div>
                    </div>
                    <div className="h-full overflow-hidden rounded-[10px]">
                        <Image 
                            src={ thumbnail }
                            alt="Malex contact data"
                            className="h-full "
                        />
                    </div>
                </div>
            </section>
            <FormPreviewSection />
        </main>
    )
}