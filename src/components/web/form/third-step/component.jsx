"use client";

// others
import clsx from "clsx";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { useState, createContext, useContext } from "react";
import { FormCtx } from "../ctx";

// components
import StepWrapper from "../step-wrapper/component";

// css
import styles from "./styles.module.css";

dayjs.extend(objectSupport);

const TimeSelectCtx = createContext();

function Time({ date }){
    const { setTime, currentTime } = useContext(TimeSelectCtx);

    return (
        <div
            className={
                clsx(
                    styles.time,
                    (currentTime != null && date.format("LT") == currentTime.format("LT")) && "bg-dodger-blue text-white"
                )
            } 
            onClick={ () => setTime(date) }
        >
            <span>{ date.format("LT") }</span>        
        </div>
    )
}

function TimeSelect(){
    const start = dayjs({ hour: 8 });
    const end = dayjs({ hour: 16 });
    const STEP = 0.5; // hours
    const arr = [];
    let hOffset = 0;

    for(let i = 0; i < parseInt(end.diff(start, "hour") / STEP) + 1; i++){        
        arr.push(<Time date={ start.add({ hour: hOffset }) }/>);

        hOffset += STEP;
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
    const { sclForward } = useContext(FormCtx);

    return (
        <StepWrapper>
            { currentTime && <input type="hidden" name="time" value={ currentTime.toISOString() } /> }
            
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <h2 className="text-center font-light text-xl mb-5">Select a time</h2>
            <TimeSelectCtx.Provider value={ { setTime, currentTime } }>
                <TimeSelect/>
            </TimeSelectCtx.Provider>
            <button 
                className="redirect-btn redirect-btn--blue mt-8 min-[450px]:max-w-[250px]"
                onClick={ () => currentTime && sclForward() }
                type="submit"
            >
                <span>Next</span>
            </button>
        </StepWrapper>
    )    
};