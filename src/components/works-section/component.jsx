
// tools
import Image from "next/image";
import clsx from "clsx";

// components
import RedirectButton from "@/components/redirect-btn/component";
import ScrollProgressBar from "@/components/points-scrollbar/component";

// css
import styles from "./styles.module.css";

// images
import jpg_1 from "./1.jpg";
import jpg_2 from "./2.jpg";
import jpg_3 from "./3.jpg";
import jpg_4 from "./4.jpg";
import jpg_5 from "./5.jpg";
import jpg_6 from "./6.jpg";
import jpg_7 from "./7.jpg";
import jpg_8 from "./8.jpg";
import jpg_9 from "./9.jpg";


export default function WorksSection(){
    return (
        <section className={styles.section}>
            <h1 className="s_title">Our Works</h1>
            <div className="s_row_con">
                <ul className="s_row">
                    <li 
                        className={
                            clsx(
                                styles.cards_con,
                                "s_row_e"
                            )
                        }
                    >
                        <div className={styles.card}>
                            <Image
                                src={jpg_1}
                                alt="1"
                            />
                        </div>
                        <div className={styles.card}>
                            <Image
                                src={jpg_2}
                                alt="2"
                            />
                        </div>
                        <div className={styles.card}>
                            <Image
                                src={jpg_3}
                                alt="3"
                            />
                        </div>
                    </li>
                    <li className={styles.cards_con}>
                        <div className={styles.card}>
                            <Image
                                src={jpg_4}
                                alt="4"
                            />
                        </div>
                        <div className={styles.card}>
                            <Image
                                src={jpg_5}
                                alt="5"
                            />
                        </div>
                        <div className={styles.card}>
                            <Image
                                src={jpg_6}
                                alt="6"
                            />
                        </div>
                    </li>
                    <li className={styles.cards_con}>
                        <div className={styles.card}>
                            <Image
                                src={jpg_7}
                                alt="7"
                            />
                        </div>
                        <div className={styles.card}>
                            <Image
                                src={jpg_8}
                                alt="8"
                            />
                        </div>
                        <div className={styles.card}>
                            <Image
                                src={jpg_9}
                                alt="9"
                            />
                        </div>
                    </li>
                </ul>
            </div>
            <ScrollProgressBar/>
            <RedirectButton
                type="white"
                label="See all works"
                isLink={true}
                href="/our-works"
            />
        </section>
    )
}