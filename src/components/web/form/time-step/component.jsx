"use client";

// others
import clsx from "clsx";
import { dayjs } from "@lib/dayjs";
import { useState, createContext, useContext } from "react";
import { FormCtx } from "../ctx";
import { SiteConfigQueries, AppointmentQueries } from "@lib/apollo-clients/queries/frontend";
import * as tools from "@lib/tools";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton, BackButton, ScrollBtnsCon } from "../step-wrapper/component";
import LoadingSection from "@web/loading-section/component";

// css
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client/react";

const TimeSelectCtx = createContext();

function Time({ date, isBusy }){
    const { setTime, currentTime } = useContext(TimeSelectCtx);

    return (
        <div
            className={
                clsx(
                    styles.time,
                    isBusy && "text-ice-blue border-0! cursor-auto!",
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
    const contactData = useQuery(SiteConfigQueries.contactData());
    const timeRange = tools.inRangeOfOneDay(date);
    const busyTimesAtDay = useQuery(
        AppointmentQueries.busyInRange(),
        { 
            variables: { 
                start: timeRange[0].toISOString(), 
                end: timeRange[1].toISOString(), 
                unit: "APPOINTMENT" 
            } 
        }
    );

    // wait until loading
    if (contactData.loading | busyTimesAtDay.loading ) return <LoadingSection />;

    const step = contactData.data.contactData.data[0].min_duration;
    const start = dayjs(contactData.data.contactData.data[0].opening_at);
    const end = dayjs(contactData.data.contactData.data[0].closing_at);
    const times = [];
    const workTime = end.unix() - start.unix();
    let hOffset = 0;
    let appTime = dayjs(start);

    // console.log(start.unix(), end.unix(), workTime, step );

    console.log(start, end);
    console.log(appTime.unix(), workTime)
    console.log(appTime.unix() < workTime);

    while (appTime.unix() < workTime){        
        appTime = appTime.add({ hour: hOffset });

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

        hOffset += step;
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
                                    .toISOString()
                                }
                            }
                        } 
                    isSubmit 
                />
            </ScrollBtnsCon>
        </StepWrapper>
    )    
};