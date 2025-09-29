"use client";

// tools
import Image from "next/image";
import { useState } from "react";
import * as dayjs from "dayjs";
import clsx from "clsx";

// components
import MainFormStepWrapper from "@/components/main-form-step-wrapper/component";

// css
import styles from "./styles.module.css";

// images
import next_svg from "./next.svg";


function generateCalendar(date){
    const daysInMonth = date.daysInMonth();
    const offset = date.date(1).day() - 1; 
    const rest = date.date(daysInMonth).day() != 0 && 7 - date.date(daysInMonth).day();
    const calendar = [];
    let row_i = 0;
    let row = [];

    // add offset to first row
    for (let i = 0; i < offset; i++){
        row.push(<td key={i - offset} ></td>);
    }

    // add cells with days
    for (let i = 0; i < daysInMonth; i++){
        if (row.length == 7){
            calendar.push(
                <tr key={row_i}>
                    {row.map(e => e)}
                </tr>
            );
            row = [];
            row_i ++;
        }

        row.push(
            <td
                className={styles.day}
                key={date.date(1).subtract(i + 1, "day")}
            >
                {i + 1}
            </td>
        );
    }

    // add rest to last row
    for (let i = 0; i < rest; i++){
        row.push(<td key={i + daysInMonth}></td>);
    }

    calendar.push(
        <tr key={row_i + 1}>
            {row.map(e => e)}
        </tr>
    );

    return <tbody>{calendar.map(e => e)}</tbody>;
}

// should be inserted in ul
export default function SecondFormStep(){
    const [currentDate] = useState(dayjs());

    return (
        <MainFormStepWrapper nextFunc={e => {}}>
            <h1
                className={
                    clsx(
                        styles.title,
                        "s_title"
                    )
                }
            >
                Make an appointment
            </h1>
            <h2 className={styles.undertitle}>Select a date</h2>
            <div className={styles.scl_calendar_panel}>
                <button className={styles.scl_calendar_btn}>
                    <Image 
                        src={next_svg} 
                        alt="Scroll to previous month" 
                        style={{transform: "rotate(180deg)"}}
                    />
                </button>
                <div 
                    className={
                        clsx(
                            "s_row_con",
                            styles.calendar_label_row_con
                        )
                    }
                >
                    <ul 
                        className={
                            clsx(
                                "s_row",
                                styles.calendar_label_row
                            )
                        }
                    >
                        {currentDate.format("MMMM YYYY")}
                    </ul>
                </div>
                <button className={styles.scl_calendar_btn}>
                    <Image 
                        src={next_svg} 
                        alt="Scroll to next month" 
                    />
                </button>
            </div>
            <div className={styles.calendar_row_con}>
                <ul className={styles.calendar_row}>
                    <li className={styles.calendar}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>
                                        Mo
                                    </th>
                                    <th>
                                        Tu
                                    </th>
                                    <th>
                                        We
                                    </th>
                                    <th>
                                        Th
                                    </th>
                                    <th>
                                        Fr
                                    </th>
                                    <th>
                                        Sa
                                    </th>
                                    <th>
                                        Su
                                    </th>
                                </tr>
                            </thead>
                            {generateCalendar(currentDate)}
                        </table>
                    </li>
                </ul>
            </div>
        </MainFormStepWrapper>
    )
}