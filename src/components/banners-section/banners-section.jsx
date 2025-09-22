
// tools
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

// components
import ScrollProgressBar from "@/components/scroll-progress-bar/scroll-progress-bar";
import RedirectButton from "@/components/redirect-btn/redirect-btn"

// css
import styles from "./banners-section.module.css";

//images
import banner_1_jpg from "./banner_1.jpg"
import banner_2_jpg from "./banner_2.jpg"
import banner_3_jpg from "./banner_3.jpg"

function Banner({title, underlined, undertitle, thumbnail}){
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

    return (
        <li className={styles.banner}>
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

export default function BannersSection() {    
    return (
        <section className={styles.section}>
            <div className="s_row_con">
                <ul className="s_row">
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
                <ScrollProgressBar delay={5}/>
            </div>
        </section>
    )
}