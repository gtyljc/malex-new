
"use client";

// others
import Image from "next/image";
import { useFrontendClient } from "@src/lib/apollo-clients/frontend";
import { dayjs } from "@lib/dayjs";

// components
import PathToPageSection from "@web/path-to-page/component";
import FormPreviewSection from "@web/form-preview/component";
import LoadingSection from "@web/loading-section/component";

// images
import thumbnail from "./thumbnail.jpg";
import phone from "./phone.svg";
import email from "./email.svg";
import time from "./time.svg";

function ContactDataField({ children, icon }){
    return (
        <li className="flex flex-row items-center gap-3">
            <Image src={ icon } alt="Malex contact" className="lg:size-[32px]" />
            { children }
        </li>
    )
}


function PhoneNumberField({ phoneValue }){
    return (
        <ContactDataField icon={ phone }>
            <span className="font-semibold lg:text-lg">{ phoneValue }</span>
        </ContactDataField>
    )
}

function SupportEmailField({ emailValue }){
    return (
        <ContactDataField icon={ email }>
            <span className="font-semibold lg:text-lg">{ emailValue }</span>
        </ContactDataField>
    )
}

function TimeField({ openingAtValue, closingAtValue }){
    return (
        <ContactDataField icon={ time }>
            <span className="font-semibold lg:text-lg">
                { `Mon-Fri: ${ openingAtValue } - ${ closingAtValue }, Sat-Sun: Closed` }
            </span>
        </ContactDataField>
    )
}

export default function Contact(){
    const { siteConfig } = useFrontendClient();

    return (
        <main>
            <PathToPageSection page_name="Contact" />
            <section className="w-full flex flex-col items-center">
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:w-full">
                    <div className="w-full max-w-[470px] flex flex-col gap-5">
                        <h1 className="section-title">Contact</h1>
                        <div className="w-full flex flex-col md:order-2 gap-10">
                            <p>We’re always ready to answer your questions and offer the assistance you need</p>
                            <ul className="flex flex-col gap-6 mb-5 md:mb-0">
                                <PhoneNumberField phoneValue={ siteConfig.phone_number } />
                                <SupportEmailField emailValue={ siteConfig.support_email } />
                                <TimeField 
                                    openingAtValue={ dayjs(siteConfig.starting_at).format("LT") } 
                                    closingAtValue={ dayjs(siteConfig.closing_at).format("LT") } 
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