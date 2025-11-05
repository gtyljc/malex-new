"use client";

// others
import clsx from "clsx";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { useState, createContext, useContext } from "react";

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
                    (currentTime != null && date.format("LT") == currentTime.format("LT")) && styles.selected_time,
                    styles.time
                )
            } 
            onClick={() => setTime(date)}
        >
            <span>{date.format("LT")}</span>        
        </div>
    )
}

function TimeSelect(){
    const start = dayjs({hour: 8});
    const end = dayjs({hour: 16});
    const STEP = 0.5; // hours
    const arr = [];
    let h_offset = 0;

    for(let i = 0; i < parseInt(end.diff(start, "hour") / STEP) + 1; i++){        
        arr.push(<Time date={start.add({hour: h_offset})}/>);

        h_offset += STEP;
    }

    return (
        <div className={styles.time_select}>
            {arr}
        </div>
    );
}

export default function ThirdFormStep() {
    const [currentTime, setTime] = useState(null);

    return (
        <StepWrapper
            nextCheck={() => currentTime != null ? true: false}
            hasSubmitBtn={true}
        >
            { currentTime && <input type="hidden" name="time" value={currentTime.toISOString()} /> }
            
            <h2 className={styles.undertitle}>Select a time</h2>
            <TimeSelectCtx.Provider value={{setTime, currentTime}}>
                <TimeSelect/>
            </TimeSelectCtx.Provider>
        </StepWrapper>
    )    
};