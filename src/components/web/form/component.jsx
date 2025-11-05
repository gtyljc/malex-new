"use client";

// others
import clsx from "clsx";
import Image from "next/image";
import { useContext, useRef } from "react";
import { createAppointment } from "./actions";
import { 
    FormOpenCtx, 
    FormStepIndexCtx, 
    // FormStepsCtx
} from "./ctx";

// components
import FirstFormStep from "./first-step/component";
import SecondFormStep from "./second-step/component";
import ThirdFormStep from "./third-step/component";
import FourthFormStep from "./fourth-step/component";

// css
import styles from "./styles.module.css";

// images
import close_svg from "./close.svg";

export default function Form() {
    // const steps = [
    //     useRef(null),
    //     useRef(null),
    //     useRef(null)
    // ];
    const { isOpened, closeForm } = useContext(FormOpenCtx);
    const { index } = useContext(FormStepIndexCtx);
    // const { setSteps } = useContext(FormStepsCtx);

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
            <div className={clsx("s_row_con", styles.steps_row_con)}>
                <div className={styles.top}>
                    <div className={styles.close_btn_con}>
                        <button 
                            className={styles.close_btn} 
                            onClick={closeForm}
                            type="button"
                        >
                            <span>Close</span>
                            <Image 
                                src={close_svg} 
                                alt="Close Malex appointment window" 
                            />
                        </button>
                    </div>
                </div>
                <ul
                    className={clsx("s_row", styles.steps_row)}
                    style={
                        { transform: `translateX(${(-index * 100) + "%"})` }
                    }
                >   
                    <FirstFormStep/>                    
                    <SecondFormStep/>
                    <ThirdFormStep/>
                    <FourthFormStep/>
                </ul>
            </div>
        </form>
    )
}