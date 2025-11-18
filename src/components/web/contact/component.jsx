
// others
import Image from "next/image";

// components
import PathToPageSection from "@web/path-to-page/component";
import FormPreviewSection from "@web/form-preview/component";
import clsx from "clsx";

// images
import thumbnail from "./thumbnail.jpg";
import phone from "./phone.svg";
import email from "./email.svg";
import time from "./time.svg";

function ContactData({ icon, value }){
    return (
        <li className="flex flex-row gap-1">
            <Image
                src={ icon }
                alt="Malex contact data"
            />
            <span>{ value }</span>
        </li>
    )
}

export default function Contact(){
    return (
        <main>
            <PathToPageSection page_name="Contact" />
            {/* <section className="w-full">
                <h1 className="mb-3 text-2xl font-semibold">Contact</h1>
                <div className="flex flex-col md:flex-row md:gap-[50px]">
                    <div className="w-full flex flex-col gap-5 md:order-2">
                        <h1 className="text-lg font-medium mb:text-3xl">Our Contact Information</h1>
                        <p>We’re always ready to answer your questions and offer the assistance you need</p>
                        <ul className="flex flex-col gap-6 mb-5 md:mb-0">
                            <ContactData icon={ phone } value="+13474101444" />
                            <ContactData icon={ email } value="support@malexhandy.com" />
                            <ContactData icon={ time } value="Mon-Fri: 9:00 AM - 6:00 PM, Sat-Sun: Closed" />
                        </ul>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="h-full overflow-hidden rounded-[10px]">
                            <Image 
                                src={ thumbnail }
                                alt="Malex contact data"
                                className="h-full "
                            />
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <FormPreviewSection /> */}
        </main>
    )
}