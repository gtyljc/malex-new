
"use client";

// others
import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { SiteConfigQueries } from "@src/apollo-clients/requests/front-requests";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

// components
import PathToPageSection from "@web/path-to-page/component";
import FormPreviewSection from "@web/form-preview/component";

// images
import thumbnail from "./thumbnail.jpg";
import phone from "./phone.svg";
import email from "./email.svg";
import time from "./time.svg";

dayjs.extend(localizedFormat);

function ContactDataField({ children, icon }){
    return (
        <li className="flex flex-row items-center gap-3">
            <Image src={ icon } alt="Malex contact" className="lg:size-[32px]" />
            { children }
        </li>
    )
}

function PhoneNumberField(){
    const { data, loading } = useQuery(SiteConfigQueries.contactData());

    // wait until data will be loaded
    if (loading) { return <li>Loading...</li> }

    return (
        <ContactDataField icon={ phone }>
            <span className="font-semibold lg:text-lg">{ data.contactData.data[0].phone_number }</span>
        </ContactDataField>
    )
}

function SupportEmailField(){
    const { data, loading } = useQuery(SiteConfigQueries.contactData());

    // wait until data will be loaded
    if (loading) { return <li>Loading...</li> } 

    return (
        <ContactDataField icon={ email }>
            <span className="font-semibold lg:text-lg">{ data.contactData.data[0].support_email }</span>
        </ContactDataField>
    )
}

function TimeField(){
    const { data, loading } = useQuery(SiteConfigQueries.contactData());

    // wait until data will be loaded
    if (loading) { return <li>Loading...</li> }

    const formatedStartingAt = dayjs(data.contactData.data[0].starting_at).format("LT");
    const formatedClosingAt = dayjs(data.contactData.data[0].closing_at).format("LT");

    return (
        <ContactDataField icon={ time }>
            <span className="font-semibold lg:text-lg">
                { `Mon-Fri: ${ formatedStartingAt } - ${ formatedClosingAt }, Sat-Sun: Closed` }
            </span>
        </ContactDataField>
    )
}

export default function Contact(){
    return (
        <main>
            <PathToPageSection page_name="Contact" />
            <section className="w-full flex flex-col items-center">
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:w-full">
                    <div className="w-full max-w-[470px]">
                        <h1 className="mb-5 section-title">Contact</h1>
                        <div className="w-full flex flex-col gap-5 md:order-2">
                            <p>We’re always ready to answer your questions and offer the assistance you need</p>
                            <ul className="flex flex-col gap-6 mb-5 md:mb-0">
                                <PhoneNumberField />
                                <SupportEmailField />
                                <TimeField />
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