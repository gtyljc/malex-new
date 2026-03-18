"use client";

// others
import clsx from "clsx";
import { dayjs } from "@lib/dayjs/client";
import { useState, createContext, useContext } from "react";
import { FormCtx } from "../ctx";
import { BusyInRangeDocument } from "@src/lib/apollo-clients/queries/resources/Appointments.generated";
import { clientAC } from "@src/lib/apollo-clients/client";
import * as types from "@lib/types";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton, BackButton, ScrollBtnsCon } from "../step-wrapper/component";
import LoadingSection from "@web/loading-section/component";

// css
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client/react";

interface TimeSelectCtx {
    setTime: Function | undefined,
    currentTime: dayjs.Dayjs | null | undefined
}

const TimeSelectCtx = createContext<TimeSelectCtx>(
    { 
        setTime: undefined, 
        currentTime: undefined 
    }
);

interface TimeParams {
    date: dayjs.Dayjs,
    isBusy: boolean
}

function Time({ date, isBusy }: TimeParams){
    const { setTime, currentTime } = useContext(TimeSelectCtx);

    return (
        <div
            className={
                clsx(
                    styles.time,
                    isBusy && "bg-ice-blue border-0! cursor-auto!",
                    !isBusy &&
                    (currentTime && date.format("LT") == currentTime.format("LT")) && 
                    "bg-dodger-blue text-white border-0!"
                )
            } 
            onClick={ 
                () => {
                    if(currentTime){

                        // if user double-clicked on day
                        if (currentTime.unix() == date.unix()){ setTime(null); return }
                        else setTime(date);
                    }
                    
                    setTime(date);
                } 
            }
        >
            <span>{ date.format("LT") }</span>   
        </div>
    )
}

function TimeSelect(){
    const { inputData: { date } } = useContext(FormCtx);
    const { siteConfig } = clientAC;
    const busyTimesAtDay = useQuery(
        BusyInRangeDocument,
        { variables: { date, unit: types.TimeUnitEnum.Appointment } }
    );

    // wait until loading
    if (busyTimesAtDay.loading ) return <LoadingSection />;

    const step = siteConfig.minDuration;
    const start = dayjs.tz(siteConfig.openingAt);
    const end = dayjs.tz(siteConfig.closingAt);
    const times = [];
    const endTime = dayjs.tz(date).hour(end.hour()).minute(end.minute());
    let appTime = dayjs.tz(date).hour(start.hour()).minute(start.minute());

    while (appTime.unix() < endTime.unix()){
        times.push(
            <Time
                key={ appTime.toISOString() }
                date={ appTime }
                isBusy={ 
                    busyTimesAtDay.data.busyInRange.data.filter(
                        e => appTime.toISOString() == e.date
                    ).length != 0 
                }
            />
        );

        appTime = appTime.add({ hour: step });
    }

    return (
        <div className="min-h-[180px] flex flex-row justify-center items-center">
            <div className="max-w-[405px] flex flex-row flex-wrap gap-2">
                { times }
            </div>
        </div>
    );
}

const STEP_I = 2;

export default function TimeStep() {
    const [ currentTime, setTime ] = useState(null);
    const { inputData } = useContext(FormCtx);

    return (
        <StepWrapper sIndex={ STEP_I } >
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <h2 className="text-center font-light text-xl mb-5">Select a time</h2>
            <TimeSelectCtx.Provider value={ { setTime, currentTime } }>
                <TimeSelect />
            </TimeSelectCtx.Provider>
            <ScrollBtnsCon>
                <BackButton />
                <NextButton 
                    onClick={ 
                        () => {
                            if (currentTime){
                                inputData.date = inputData.date
                                    .add(currentTime.hour(), "hour")
                                    .add(currentTime.minute(), "minute")
                                }

                                return true;
                            }
                        } 
                    isSubmit 
                />
            </ScrollBtnsCon>
        </StepWrapper>
    )    
};