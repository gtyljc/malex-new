"use client";

// others
import Image from "next/image";
import { useState, useContext, createContext } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import clsx from "clsx";
import { FormCtx } from "../ctx";
import { useQuery } from "@apollo/client/react";
import { AppointmentQueries } from "@src/apollo-clients/queries/frontend";
import * as tools from "@src/tools";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton, BackButton } from "../step-wrapper/component";
import LoadingSection from "@web/loading-section/component";

// css
import styles from "./styles.module.css";

// images
import next from "./next.svg";

dayjs.extend(localizedFormat);

const CalenderCtx = createContext();

function Day({ date, isBusy }){
    const { setDay, currentDay } = useContext(CalenderCtx);
    const isDisabled = isBusy || date.unix() <= dayjs().unix();

    return(
        <td className="p-[4px]">
            <div
                className={
                    clsx(
                        styles.day,
                        isDisabled && "bg-ice-blue text-graphite cursor-auto! border-0!",

                        // can be hovered only if it is enabled
                        !isDisabled && 
                        ( currentDay != null && currentDay.format("L") == date.format("L") ) && 
                        "bg-dodger-blue text-white border-0!"
                    )
                }
                onClick={ 
                    !isDisabled ? () => {
                        if(currentDay){

                            // if user double-clicked on day
                            if (currentDay.unix() == date.unix()){ setDay(null); return }
                            else setDay(date);
                        }
                        
                        setDay(date);
                    }: () => {}  
                }
            >
                { date.date() }
            </div>
        </td>
    )
}

function Calendar(){
    const { currentMonth } = useContext(CalenderCtx);
    const timeRange = tools.inRangeOfOneDay(currentMonth);
    const { data, loading } = useQuery(
        AppointmentQueries.busyInRange(),
        { 
            variables: { 
                start: timeRange[0].toISOString(), 
                end: timeRange[1].toISOString(), 
                unit: "DAY" 
            } 
        }
    );

    // wait until loaded
    if (loading) return <LoadingSection loadingIconStyles="size-[60px]!" />;

    const weekDays = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
    const daysInMonth = currentMonth.daysInMonth();
    const offset = currentMonth.date(1).day();    
    const lastDay = currentMonth.date(daysInMonth).day(); // which day of week is last day
    const rest = lastDay != 0 ? 0: 6 - lastDay;
    const tbodyContent = [];
    let rowI = 0;
    let row = [];
    let dayDate = tools.resetAfterDay(currentMonth.date(1)); // starts always from 1 day

    // add offset to first row
    for (let i = 0; i < offset; i++){
        row.push(<td key={ i - offset } ></td>);
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
                key={ dayDate.add(i, "day").toISOString() }
                date={ dayDate.add(i, "day") } 
                isBusy={ data.busyInRange.data.filter((e) => dayjs(e.date).date() == i + 1) != 0 }
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
                <tr>{ weekDays.map(e => <th key={ e } className="h-20 font-light select-none">{ e }</th>) }</tr>
            </thead>
            <tbody>{ tbodyContent }</tbody>
        </table>
    );
}

function ScrollMonthBtn({ icon, func, className }){
    return (
        <button onClick={ func } className={ clsx("svg-btn select-none", className) } type="button">
            { icon }
        </button>
    )
}

const STEP_I = 1;

// should be inserted in ul
export default function DateStep(){
    const [ currentMonth, setMonth ] = useState(dayjs());
    const [ currentDay, setDay ] = useState(null);
    const { inputData } = useContext(FormCtx);

    return (
        <StepWrapper sIndex={ STEP_I }>
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <h2 className="text-center font-light text-xl mb-5">Select a date</h2>
            <div className="w-full max-w-[340px] flex flex-row justify-between items-center">
                <ScrollMonthBtn 
                    className={ currentMonth.format("L")  == dayjs().format("L")  && "pointer-events-none opacity-50" }
                    icon={
                        <Image
                            src={ next }
                            alt="Scroll to previous month" 
                            style={ { transform: "rotate(180deg)" } }
                        />
                    }
                    func={ () => { setMonth(currentMonth.subtract(1, "month")) } }
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
            <div className="w-full flex flex-row gap-2">
                <BackButton />
                <NextButton 
                    onClick={
                        () => { 
                            if(currentDay) { 
                                inputData.date = currentDay;

                                return true; 
                            } 
                            return false; 
                        } 
                    } 
                />
            </div>
        </StepWrapper>
    )
}