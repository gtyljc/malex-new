"use client";

// tools
import { useState } from "react";
import { Dayjs } from "dayjs";
import clsx from "clsx";

// css
import styles from "./s-form-step.module.css";

// images
import next_svg from "./next.svg";

export default function SecondFormStep(){
    const [currentDate, setDate] = useState();

    return (
        <li className={styles.step}>
            <h1 className="s_title">Make an appointment</h1>
            <h2 className={styles.step_undertitle}>Select a date</h2>
            <div className={styles.scl_calendar_panel}>
                <button className={styles.scl_calendar_btn}>
                    <img src={next_svg} alt="Scroll to next month" />
                </button>
                <ul 
                    className={
                        clsx(
                            "s_row_con",
                            styles.calendar_label_row_con
                        )
                    }
                >
                    
                </ul>
                <button className={styles.scl_calendar_btn}>
                    <img src={next_svg} alt="Scroll to next month" style={{transform: "rotate(180deg)"}}/>
                </button>
            </div>
            <div className={styles.calendar_row_con}>
                <ul className={styles.calendar_row}>
                    <li className={styles.calendar}>
                        <ul className={styles.calendar}>
                            {

                            }
                            <li className={styles.day}></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </li>
    )
}