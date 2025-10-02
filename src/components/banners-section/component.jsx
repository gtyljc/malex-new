"use client";

// tools
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useContext } from "react";
import {
    PointsScrollbarProviders, 
    PointsScrollbarCurrentIndexCtx 
} from "@components/points-scrollbar/ctx";

// components
import PoinsScrollbar from "@components/points-scrollbar/component";
import RedirectButton from "@components/redirect-btn/component";

// css
import styles from "./styles.module.css";

//images
import banner_1_jpg from "./banner_1.jpg"
import banner_2_jpg from "./banner_2.jpg"
import banner_3_jpg from "./banner_3.jpg"


function AssembledTitle({title, underlined}){
    const i = title.indexOf(underlined);
    const before = title.slice(0, i);
    const after = title.slice(i + underlined.length);

    return (
        <h1 className={
            clsx(
                styles.title,
                "s_title"
            )
        }>
            {before}
            <span className={styles.underlined_title}>{underlined}</span>
            {after}
        </h1>
    )
}

function Banner({title, underlined, undertitle, thumbnail}){
    return (
        <li 
            className={
                clsx(
                    styles.banner,
                    "s_row_e"
                )
            }
        >
            <div className={styles.info}>
                <AssembledTitle
                    title={title}
                    underlined={underlined}
                />
                <h2 className={
                        clsx(
                            styles.undertitle,
                            "s_undertitle"
                        )
                    }
                >{undertitle}</h2>
                <div className={styles.interactive}>
                    <RedirectButton label="Request a Service"/>
                    <Link href="/about-us" className="s_link">Learn More About Us</Link>
                </div>
            </div>
            <div className={
                    clsx(
                        "s_half",
                        "s_thumbnail"
                    )
                }
            >
                {thumbnail}
            </div>
        </li>
    )
}

function _BannersSection() {
    const { index, setIndex } = useContext(PointsScrollbarCurrentIndexCtx);
    const scrollDelay = 8; // sec
    const pointsNum = 3;
    const row_gap = 20; // %

    useEffect(
        () => {
            const timer = setInterval(
                () => {
                    index < pointsNum - 1 ? setIndex(index + 1): setIndex(0)
                },
                1000 * scrollDelay
            )

            return () => clearInterval(timer);
        }
    );

    return (
        <section className={styles.section}>
            <div 
                className={
                    clsx(
                        "s_row_con",
                        styles.banners_row_con
                    )
                }
            >
                <ul 
                    className={
                        clsx(
                            "s_row",
                            styles.banners_row
                        )
                    }
                    style={
                        {
                            transform: `translateX(-${index * (100 + row_gap)}%)`,
                            gap: `${row_gap}%`,
                            transitionDuration: "1.5s" // sec
                        }
                    }
                >
                    <Banner 
                        title="Professional Plumbing Services for Your Home and Business"
                        underlined="Plumbing Services"
                        undertitle="Quick and reliable plumbing solutions for any need."
                        thumbnail={
                            <Image
                                src={banner_1_jpg}
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
                                src={banner_2_jpg}
                                alt="Makex assembly"
                            />
                        }
                    />
                    <Banner 
                        title="Professional Mounting — Secure and Safe!"
                        underlined="Mounting"
                        undertitle="We provide precise and safe mounting for your equipment, ensuring long-lasting and flawless operation."
                        thumbnail={
                            <Image
                                src={banner_3_jpg}
                                alt="Malex mounting"
                            />
                        }
                    />
                </ul>
            </div>
            <div className={styles.spb_con}>
                <PoinsScrollbar p_num={pointsNum}/>
            </div>
        </section>
    )
}

export default function BannersSection(){
    return (
        <PointsScrollbarProviders>
            <_BannersSection/>
        </PointsScrollbarProviders>
    );
}