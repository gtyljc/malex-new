
"use client";

// others
import Image from "next/image";
import clsx from "clsx";
import { 
    PointsScrollbarProvider, 
    PointsScrollbarCtx 
} from "@web/points-scrollbar/ctx";
import { useContext } from "react";

// components
import ScrollProgressBar from "@web/points-scrollbar/component";

// css
import styles from "./styles.module.css";

function WorksSectionContent(){
    const { index, setIndex } = useContext(PointsScrollbarCtx);
    const rowGap = 20; // %

    return (
        <section className="">
            <h1 className="">Our Works</h1>
            <div className="row-con">
                <ul 
                    className="row"
                    style={
                        {
                            transform: `translateX(-${index * (100 + rowGap)}%)`,
                            gap: `${ rowGap }%`
                        }
                    }
                >
                    {/* <li 
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
                    </li> */}
                </ul>
            </div>
            <ScrollProgressBar p_num={ 3 }/>
            <a className="redirect-btn redirect-btn--white" href="/our-works">
                See all works
            </a>    
        </section>
    )
}

export default function WorksSection(){
    return (
        <PointsScrollbarProvider>
            <WorksSectionContent />
        </PointsScrollbarProvider>
    )
}
