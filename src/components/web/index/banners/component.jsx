"use client";

// others
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import {
    PointsScrollbarProvider, 
    PointsScrollbarCtx 
} from "@web/points-scrollbar/ctx";

// components
import PointsScrollbar from "@web/points-scrollbar/component";

//images
import banner_1 from "./banner_1.jpg"
import banner_2 from "./banner_2.jpg"
import banner_3 from "./banner_3.jpg"

function BannerTitle({ title, underlined }){
    const i = title.indexOf(underlined);
    const before = title.slice(0, i);
    const after = title.slice(i + underlined.length);

    return (
        <h1 className="text-2xl font-medium">
            { before }
            <span className="font-semibold underline">{ underlined }</span>
            { after }
        </h1>
    )
}

function Banner({ title, underlined, undertitle, thumbnail }){
    return (
        <li className="row-el flex flex-row justify-center">
            <div className="w-full max-w-[560px] flex flex-col gap-5">
                <div className="flex flex-col gap-6">
                    <BannerTitle title={ title } underlined={ underlined }/>
                    <h2 className="">{ undertitle }</h2>
                    <div className="flex flex-row gap-3">
                        <button className="redirect-btn redirect-btn--blue">
                            Request a Service
                        </button>
                        <Link 
                            href="/about-us" 
                            className="w-full flex flex-col justify-center items-center text-nowrap text-base"
                        >
                            <span>Learn More About Us</span>
                        </Link>
                    </div>
                </div>
                <div
                    className={
                        clsx(
                            "w-full flex flex-col items-center justify-center",
                            "max-h-[240px] rounded-[10px] overflow-hidden"
                        )
                    }
                >
                    { thumbnail }
                </div>
            </div>
        </li>
    )
}

function BannersSectionContent() {
    const { index, setIndex } = useContext(PointsScrollbarCtx);
    const scrollDelay = 8000; // miliseconds
    const rowGap = 20;
    const pointsNum = 3;

    useEffect(
        () => {
            const timer = setInterval(
                () => index < pointsNum - 1 ? setIndex(index + 1): setIndex(0),
                scrollDelay
            )

            return () => clearInterval(timer);
        }
    );

    return (
        <section className="w-full flex flex-col items-center gap-5 bg-ice-blue rounded-[10px] p-5 box-border">
            <div className="row-con">
                <ul 
                    className="row"
                    style={ 
                        { 
                            transform: `translateX(-${ index * (100 + rowGap) }%)`,
                            gap: `${rowGap}%`
                        } 
                    }
                >
                    <Banner 
                        title="Professional Plumbing Services for Your Home and Business"
                        underlined="Plumbing Services"
                        undertitle="Quick and reliable plumbing solutions for any need."
                        thumbnail={
                            <Image
                                src={ banner_1 }
                                alt="Malex plumbing"
                            />
                        }
                    />
                    <Banner 
                        title="Professional Assembly — Fast and Reliable!"
                        underlined="Assembly"
                        undertitle="Our experts provide perfect assembly for your equipment, ensuring it operates reliably and efficiently."
                        thumbnail={
                            <Image
                                src={ banner_2 }
                                alt="Malex assembling"
                            />
                        }
                    />
                    <Banner 
                        title="Professional Mounting — Secure and Safe!"
                        underlined="Mounting"
                        undertitle="We provide precise and safe mounting for your equipment, ensuring long-lasting and flawless operation."
                        thumbnail={
                            <Image
                                src={ banner_3 }
                                alt="Malex mounting"
                            />
                        }
                    />
                </ul>
            </div>
            <PointsScrollbar p_num={ pointsNum }/>
        </section>
    )
}

export default function BannersSection(){
    return (
        <PointsScrollbarProvider>
            <BannersSectionContent />
        </PointsScrollbarProvider>
    );
}