"use client";

// others
import clsx from "clsx";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { useState, createContext, useContext } from "react";
import { FormCtx } from "../ctx";
import { AdminConfigQueries, AppointmentQueries } from "@src/client-requests";

// components
import StepWrapper from "../step-wrapper/component";

// css
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client/react";

dayjs.extend(objectSupport);

const TimeSelectCtx = createContext();

function Time({ date, isBusy }){
    const { setTime, currentTime } = useContext(TimeSelectCtx);

    return (
        <div
            className={
                clsx(
                    styles.time,
                    isBusy && "text-light-gray",
                    !isBusy && 
                    (currentTime && date.format("LT") == currentTime.format("LT")) && 
                    "bg-dodger-blue text-white"
                )
            } 
            onClick={ () => setTime(date) }
        >
            <span>{ date.format("LT") }</span>   
        </div>
    )
}

function TimeSelect(){

    function isTimeBusy(busyTimesAtDayData, date){
        for(let obj of busyTimesAtDayData){
            if (obj.date == date.toISOString()) return true
        }
        
        return false;
    }

    const { choosenDate } = useContext(FormCtx);
    const contactData = useQuery(AdminConfigQueries.contactData());
    const busyTimesAtDay = useQuery(
        AppointmentQueries.busyTimesAtDay(), 
        { variables: { date: choosenDate.toISOString() } }
    );

    // wait until loading
    if (contactData.loading | busyTimesAtDay.loading ) return;

    const step = contactData.data.contactData.data[0].min_duration;
    const start = dayjs(contactData.data.contactData.data[0].opening_at);
    const end = dayjs(contactData.data.contactData.data[0].closing_at);
    const arr = [];
    let hOffset = 0;
    let timeDate;

    for(let i = 0; i < parseInt(end.diff(start, "hour") / step) + 1; i++){        
        timeDate = start.add({ hour: hOffset });

        arr.push(
            <Time 
                date={ timeDate }
                isBusy={ isTimeBusy(busyTimesAtDay.data.busyTimesAtDay.data, timeDate) }
            />
        );

        hOffset += step;
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="max-w-[405px] flex flex-row flex-wrap gap-2">
                { arr }
            </div>
        </div>
    );
}

export default function ThirdFormStep() {
    const [ currentTime, setTime ] = useState(null);
    const { sclForward, choosenDate } = useContext(FormCtx);

    return (
        <StepWrapper>
            { currentTime && <input type="hidden" name="time" value={ currentTime.toISOString() } /> }
            
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <h2 className="text-center font-light text-xl mb-5">Select a time</h2>
            <TimeSelectCtx.Provider value={ { setTime, currentTime } }>
                { choosenDate && <TimeSelect/> }
            </TimeSelectCtx.Provider>
            <button 
                className="redirect-btn redirect-btn-blue mt-8 min-[450px]:max-w-[250px]"
                onClick={ () => currentTime && sclForward() }
                type="submit"
            >
                <span>Next</span>
            </button>
        </StepWrapper>
    )    
};