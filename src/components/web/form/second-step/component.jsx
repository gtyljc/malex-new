"use client";

// others
import Image from "next/image";
import { useState, useContext, createContext } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import clsx from "clsx";
import { FormCtx } from "../ctx";
import { useQuery } from "@apollo/client/react";
import { AppointmentQueries } from "@src/client-requests";

// components
import StepWrapper from "../step-wrapper/component";

// css
import styles from "./styles.module.css";

// images
import next from "./next.svg";

dayjs.extend(localizedFormat);

const CalenderCtx = createContext();

function Day({ date, isBusy }){
    const { setDay, currentDay } = useContext(CalenderCtx);
    const { setDate } = useContext(FormCtx);

    return(
        <td
            className={
                clsx(
                    styles.day,
                    isBusy && "bg-light-gray text-graphite",

                    // can be hovered only if it is free
                    !isBusy &&
                    ( currentDay != null && currentDay.format("L") == date.format("L") ) && 
                    "bg-dodger-blue text-white"
                )
            }
            key={ date.date() }
            onClick={ !isBusy ? () => { setDay(date); setDate(date) }: () => {}  } // must be clickable only if day is free
        >
            { date.date() }
        </td>
    )
}

function Calendar(){
    const { currentMonth } = useContext(CalenderCtx);
    const { data, loading } = useQuery(
        AppointmentQueries.busyDaysAtMonth(),
        { variables: { date: currentMonth.toISOString() } }
    );

    // wait until loaded
    if (loading) return <p className="mr-auto ml-auto mt-3">Loading...</p>

    const weekDays = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
    const daysInMonth = currentMonth.daysInMonth();
    const offset = currentMonth.date(1).day();    
    const lastDay = currentMonth.date(daysInMonth).day(); // which day of week is last day
    const rest = lastDay != 0 ? 0: 6 - lastDay;
    const tbodyContent = [];
    let rowI = 0;
    let row = [];
    let dayDate = currentMonth.date(1); // starts always from 1 day

    // add offset to first row
    for (let i = 0; i < offset; i++){
        row.push(<td key={i - offset} ></td>);
    }

    // add cells with days
    for (let i = 0; i < daysInMonth; i++){
        if (row.length == 7){
            tbodyContent.push(
                <tr key={ rowI }>{ row.map(e => e) }</tr>
            );
            row = [];
            rowI ++;
        }

        row.push(
            <Day 
                date={ dayDate.add(i, "day") } 
                isBusy={ data.busyDaysAtMonth.data.filter(
                    (e) => dayjs(e.date).date() == i + 1)[0].busy 
                }
            />
        );
    }

    // add rest to last row
    for (let i = 0; i < rest; i++){
        row.push(<td key={ i + daysInMonth }></td>);
    }

    tbodyContent.push(
        <tr key={ rowI + 1 }>{ row.map(e => e) }</tr>
    );

    return(
        <table className="mr-auto ml-auto mt-3">
            <thead>
                <tr>{ weekDays.map(e => <th className="w-13 h-13 font-light">{ e }</th>) }</tr>
            </thead>
            <tbody>{ tbodyContent }</tbody>
        </table>
    );
}

function ScrollMonthBtn({ icon, func }){
    return (
        <button onClick={ func } className="svg-btn" type="button">
            { icon }
        </button>
    )
}

// should be inserted in ul
export default function SecondFormStep(){
    const [ currentMonth, setMonth ] = useState(dayjs());
    const [ currentDay, setDay ] = useState(null);
    const { sclForward } = useContext(FormCtx);

    return (
        <StepWrapper>
            { currentDay && <input type="hidden" name="date" value={ currentDay.toISOString() } /> }

            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <h2 className="text-center font-light text-xl mb-5">Select a date</h2>
            <div className="w-full max-w-[340px] flex flex-row justify-between items-center">
                <ScrollMonthBtn 
                    icon={
                        <Image 
                            src={ next } 
                            alt="Scroll to previous month" 
                            style={ { transform: "rotate(180deg)" } }
                        />
                    }
                    func={ () => setMonth(currentMonth.subtract(1, "month")) }
                />
                <div className="font-medium text-lg">
                    { currentMonth.format("MMMM YYYY") }
                </div>
                <ScrollMonthBtn 
                    icon={ <Image src={ next } alt="Scroll to next month" /> }
                    func={ () => setMonth(currentMonth.add(1, "month")) }
                />
            </div>
            <CalenderCtx.Provider value={ { currentDay, setDay, currentMonth } }>
                <Calendar />
            </CalenderCtx.Provider>
            <button 
                className="redirect-btn redirect-btn-blue mt-8 min-[450px]:max-w-[250px]"
                onClick={ () => currentDay && sclForward() }
                type="button"
            >
                <span>Next</span>
            </button>
        </StepWrapper>
    )
}