"use client";

// tools
import clsx from "clsx";
import { useContext } from "react";
import { MainFormStepIndexCtx, MainFormStepsCtx } from "@/components/main-form/ctx";

// components
import RedirectButton from "@/components/redirect-btn/component";

// css
import styles from "./styles.module.css";


export default function MainFormStepWrapper(
    {
        children, 
        nextCheck // nextCheck must return true (successfully validated) or false (not validated)
    }
){
    const { sclForward } = useContext(MainFormStepIndexCtx);
    // const { steps } = useContext(MainFormStepsCtx);

    function handleNextBtnClick(){
        if (nextCheck()){

            // // hide others
            // for(let i = 0; i < steps.length; i++) {        
            //     if(i != useContext(MainFormStepIndexCtx).index){
            //         steps[i].styles.display = "none";
            //     }
            // }

            sclForward();
        }
    }

    return (
        <li
            className={
                clsx(
                    "s_row_e",
                    styles.step_con
                )
            }
        >
            <div className={styles.step}>
                {children}
                <RedirectButton
                    label="Next"
                    onClick={handleNextBtnClick}
                    style={{marginTop: "25px"}}                 
                />
            </div>
        </li>
    )
}