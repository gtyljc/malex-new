"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { createAppointment } from "./actions";
import { FormCtx } from "./ctx";

// components
import ClientDataStep from "./client-data-step/component";
import DateStep from "./date-step/component";
import TimeStep from "./time-step/component";
import FinishStep from "./finish-step/component";

// css
import styles from "./styles.module.css";

export default function Form() {
    // all buttons inside form must be with attribute type = "button"
    
    const { isOpened, index } = useContext(FormCtx);

    return (
        <form 
            action={ createAppointment }
            className={
                clsx(
                    styles.form,
                    "bg-graphite/45",
                    !isOpened && "pointer-events-none opacity-0!"
                )
            }
        >
            <div className="row-con">
                <ul
                    className="row duration-250 md:duration-500"
                    style={ { transform: `translateX(${ (-index * 100) + "%"})` } }
                >   
                    <ClientDataStep />                    
                    <DateStep />
                    <TimeStep />
                    <FinishStep />
                </ul>
            </div>
        </form>
    )
}