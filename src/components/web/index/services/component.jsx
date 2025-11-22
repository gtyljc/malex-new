"use client";

// others
import Image from "next/image"
import { useContext } from "react"
import { FormCtx } from "@web/form/ctx"

// images
import plumbing from "./plumbing.jpg"
import assembling from "./assembling.jpg"
import mounting from "./mounting.jpg"
import clsx from "clsx"

function ServiceRow({ title, text, services, thumbnail, is_thumbnail_first }) {
    const { openForm } = useContext(FormCtx);
    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-medium">{ title }</h1>
            <div 
                className={
                    clsx(
                        !is_thumbnail_first && "",
                        "max-h-[280px] h-full overflow-hidden rounded-[10px]"
                    )
                }
            >
                { thumbnail }
            </div>
            <div className="flex flex-col gap-6">
                <p className="">{ text }</p>
                <ul className="flex flex-col gap-3 list-disc! pl-[30px]!">
                    {
                        services.map(
                            (detail, i) => <li key={i}>{ detail }</li>
                        )
                    }
                </ul>
                <button 
                    onClick={ openForm }
                    className="redirect-btn redirect-btn--white mb-5"
                >
                    <span>Request a Service</span>
                </button>
            </div>
        </div>
    )
}

export default function ServicesSection() {
    return (
        <section>
            <ServiceRow
                title="Our Plumbing Services"
                text="We offer a full range of plumbing services for your home and business. Our skilled professionals handle installation, repair, and maintenance of any system. We guarantee high-quality results on time."
                services={
                    [
                        "Pipe installation and replacement",
                        "Plumbing system repair and maintenance",
                        "Water heater and boiler installation"
                    ]
                }
                is_thumbnail_first={ false }
                thumbnail={
                    <Image
                        src={ plumbing }
                        alt="Malex plumbing service"
                    />
                }
            />
            <ServiceRow
                title="Assembling"
                text="We offer professional assembly services for various equipment and furniture. Our experts have the experience and skills to perform accurate and fast assembly of items, regardless of their complexity. We guarantee high-quality work to ensure long-lasting and reliable results."
                services={
                    [
                        "Precise and reliable assembly",
                        "Experience with complex items",
                        "Quality guarantee"
                    ]
                }
                is_thumbnail_first={ true }
                thumbnail={
                    <Image
                        src={ assembling }
                        alt="Malex plumbing service"
                    />
                }
            />
            <ServiceRow
                title="Mounting"
                text="We offer professional assembly services for various equipment and furniture. Our experts have the experience and skills to perform accurate and fast assembly of items, regardless of their complexity. We guarantee high-quality work to ensure long-lasting and reliable results."
                services={
                    [
                        "Precise and reliable assembly",
                        "Experience with complex items",
                        "Quality guarantee"
                    ]
                }
                is_thumbnail_first={ false }
                thumbnail={
                    <Image
                        src={ mounting }
                        alt="Malex plumbing service"
                    />
                }
            />
        </section>
    )
}

