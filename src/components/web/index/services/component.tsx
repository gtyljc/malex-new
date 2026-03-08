"use client";

// others
import Image, { StaticImageData } from "next/image"
import { useContext } from "react"
import { FormCtx } from "@web/form/ctx"

// images
import plumbing from "./plumbing.jpg"
import assembling from "./assembling.jpg"
import mounting from "./mounting.jpg"
import clsx from "clsx"

interface ServiceRowParams {
    title: string,
    text: string,
    services: string[],
    thumbnail: StaticImageData,
    atRight?: boolean
}

function ServiceRow({ title, text, services, thumbnail, atRight }: ServiceRowParams) {
    const { openForm } = useContext(FormCtx);
    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="section-title lg:hidden">{ title }</h1>
            <div className="flex flex-col lg:flex-row lg:gap-22">
                <div
                    className={
                        clsx(
                            atRight && "lg:order-1",
                            "max-h-[280px] max-w-[525px] h-full flex flex-col justify-center items-center mb-6 overflow-hidden rounded-[10px] lg:[w-50%] lg:max-h-none lg:mb-0"
                        )
                    }
                >
                    <Image
                        src={ thumbnail }
                        alt="Malex service"
                    />
                </div>
                <div className="flex flex-col gap-6 md:gap-8 md:text-lg lg:w-[50%]">
                    <h1 className="section-title hidden lg:block">{ title }</h1>
                    <p>{ text }</p>
                    <ul className="flex flex-col gap-3 list-disc! pl-[30px]!">
                        { services.map((detail, i) => <li key={i}>{ detail }</li>) }
                    </ul>
                    <button
                        onClick={ openForm }
                        className="redirect-btn redirect-btn-white mb-5 md:max-w-[360px] lg:mt-auto lg:mb-8"
                    >
                        <span>Request a Service</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ServicesSection() {
    return (
        <section className="flex flex-col items-center">
            <div className="max-w-[660px] flex flex-col gap-6 lg:max-w-none lg:gap-20">
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
                    thumbnail={ plumbing }
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
                    atRight={ true }
                    thumbnail={ assembling }
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
                    thumbnail={ mounting }
                />
            </div>
        </section>
    )
}

