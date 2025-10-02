"use client";

// tools
import clsx from "clsx";
import Image from "next/image";
import { useContext, useRef } from "react";
import { createAppointment } from "./actions";
import { 
    MainFormOpenCtx, 
    MainFormStepIndexCtx, 
    // MainFormStepsCtx
} from "./ctx";

// components
import FirstFormStep from "@components/first-form-step/component";
import SecondFormStep from "@components/second-form-step/component";
import ThirdFormStep from "@components/third-form-step/component";

// css
import styles from "./styles.module.css";

// images
import close_svg from "./close.svg";


export default function MainForm() {
    // const steps = [
    //     useRef(null),
    //     useRef(null),
    //     useRef(null)
    // ];
    const { isOpened, closeForm } = useContext(MainFormOpenCtx);
    const { index } = useContext(MainFormStepIndexCtx);
    // const { setSteps } = useContext(MainFormStepsCtx);

    // setSteps(steps);

    return (
        <form 
            action={createAppointment} 
            className={
                clsx(
                    styles.form,
                    !isOpened && styles.form_closed
                )
            }
        >
            <div
                className={
                    clsx(
                        "s_row_con",
                        styles.steps_row_con
                    )
                }
            >
                <div className={styles.top}>
                    <div className={styles.close_btn_con}>
                        <button className={styles.close_btn} onClick={closeForm}>
                            <span>Close</span>
                            <Image 
                                src={close_svg} 
                                alt="Close Malex appointment window" 
                            />
                        </button>
                    </div>
                </div>
                <ul
                    className={
                        clsx(
                            "s_row",
                            styles.steps_row
                        )
                    }
                    style={
                        {
                            transform: `translateX(${(-index * 100) + "%"})`
                        }
                    }
                >   
                    <FirstFormStep
                        
                    />                    
                    <SecondFormStep
                
                    />
                    <ThirdFormStep
                
                    />
                </ul>
            </div>
        </form>
    )
}