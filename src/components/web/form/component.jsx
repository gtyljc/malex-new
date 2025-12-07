"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { createAppointment } from "./actions";
import { FormCtx } from "./ctx";

// components
import FirstFormStep from "./first-step/component";
import SecondFormStep from "./second-step/component";
import ThirdFormStep from "./third-step/component";
import FourthFormStep from "./fourth-step/component";

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
                    <FirstFormStep />                    
                    <SecondFormStep />
                    <ThirdFormStep />
                    <FourthFormStep />
                </ul>
            </div>
        </form>
    )
}