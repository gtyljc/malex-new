
// tools
import Image from "next/image"
import clsx from "clsx"

// css
import styles from "./wcu-section.module.css"

//images
import expirience_svg from "./expirience.svg"
import quality_svg from "./quality.svg"
import effiency_svg from "./efficiency.svg"
import transparency_svg from "./transparency.svg"

function WcuCard({title, undertitle, icon}) {
    return (
        <li className={styles.card}>
            {icon}
            <h1 className={
                    clsx(
                        "s_title",
                        styles.card_title
                    )
                }
            >{title}</h1>
            <h2 className={
                    clsx(
                        "s_undertitle",
                        styles.card_undertitle
                    )
                }
            >{undertitle}</h2>
        </li>
    )    
}

export default function WcuSection(){
    return (
        <section className={styles.section}>
            <h1 className="s_title">Why Choose us</h1>
            <ul className={styles.cards_con}>
                <WcuCard
                    title="Experience and Expertise"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={expirience_svg}
                            alt="Malex experience"
                        />
                    }
                />
                <WcuCard
                    title="Quality Guarantee"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={quality_svg}
                            alt="Malex quality"
                        />
                    }
                />
                <WcuCard
                    title="Efficiency"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={effiency_svg}
                            alt="Malex efficiency"
                        />
                    }
                />
                <WcuCard
                    title="Transparency"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={transparency_svg}
                            alt="Malex experience"
                        />
                    }
                />
            </ul>
        </section>
    )
}