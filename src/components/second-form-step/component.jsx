"use client";

// tools
import Image from "next/image";
import { useState, useContext, createContext } from "react";
import * as dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import clsx from "clsx";

// components
import MainFormStepWrapper from "@/components/main-form-step-wrapper/component";

// css
import styles from "./styles.module.css";

// images
import next_svg from "./next.svg";


dayjs.extend(localizedFormat);

const CalenderCtx = createContext();

function Day({ date }){
    const { setDay, currentDay } = useContext(CalenderCtx);

    function handleClick(){
        setDay(date);
    }

    return(
        <td
            className={
                clsx(
                    (currentDay != null && currentDay.format("L") == date.format("L")) && styles.selected_day,
                    styles.day
                )
            }
            key={date.date()}
            onClick={handleClick}
        >
            {date.date()}
        </td>
    )
}

function Calendar(){
    const { currentMonth } = useContext(CalenderCtx);
    const daysInMonth = currentMonth.daysInMonth();
    const offset = currentMonth.date(1).day();    
    const lastDay = currentMonth.date(daysInMonth).day(); // which day of week is last day
    const rest = lastDay != 0 ? 0: 6 - lastDay;
    const tbody_content = [];
    let row_i = 0;
    let row = [];
    let day_date = currentMonth.date(1); // starts always from 1 day

    // add offset to first row
    for (let i = 0; i < offset; i++){
        row.push(<td key={i - offset} ></td>);
    }

    // add cells with days
    for (let i = 0; i < daysInMonth; i++){
        if (row.length == 7){
            tbody_content.push(
                <tr key={row_i}>
                    {row.map(e => e)}
                </tr>
            );
            row = [];
            row_i ++;
        }

        row.push(<Day date={day_date.add(i, "day")}/>);
    }

    // add rest to last row
    for (let i = 0; i < rest; i++){
        row.push(<td key={i + daysInMonth}></td>);
    }

    tbody_content.push(
        <tr key={row_i + 1}>
            {row.map(e => e)}
        </tr>
    );

    return(
        <table className={styles.calendar}>
            <thead>
                <tr>
                    <th>
                        <div className={styles.t_header}>
                            Su
                        </div>
                    </th>
                    <th>
                        <div className={styles.t_header}>
                            Mo
                        </div>
                    </th>
                    <th>
                        <div className={styles.t_header}>
                            Tu
                        </div>
                    </th>
                    <th>
                        <div className={styles.t_header}>
                            We
                        </div>
                    </th>
                    <th>
                        <div className={styles.t_header}>
                            Th
                        </div>
                    </th>
                    <th>
                        <div className={styles.t_header}>
                            Fr
                        </div>
                    </th>
                    <th>
                        <div className={styles.t_header}>
                            Sa
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {tbody_content}
            </tbody>
        </table>
    );
}

// should be inserted in ul
export default function SecondFormStep(){
    const [currentMonth, setMonth] = useState(dayjs());
    const [currentDay, setDay] = useState(null);

    return (
        <MainFormStepWrapper 
            nextCheck={
                () => {
                    return currentDay != null ? true: false;
                }
            }
        >
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
                <button 
                    onClick={
                        () => {
                            setMonth(currentMonth.subtract(1, "month"));
                        }
                    }
                    className={
                        styles.scl_calendar_btn
                    }
                >
                    <Image 
                        src={next_svg} 
                        alt="Scroll to previous month" 
                        style={{transform: "rotate(180deg)"}}
                    />
                </button>
                <div className={styles.calendar_label}>
                    {currentMonth.format("MMMM YYYY")}
                </div>
                <button 
                    onClick={
                        () => {
                            setMonth(currentMonth.add(1, "month"));
                        }
                    }
                    className={
                        styles.scl_calendar_btn
                    }
                >
                    <Image 
                        src={next_svg} 
                        alt="Scroll to next month" 
                    />
                </button>
            </div>
            <CalenderCtx.Provider value={{currentDay, setDay, currentMonth}}>
                <Calendar/>
            </CalenderCtx.Provider>
        </MainFormStepWrapper>
    )
}