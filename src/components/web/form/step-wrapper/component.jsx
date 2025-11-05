"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { 
    FormStepIndexCtx, 
    FormStepsCtx 
} from "@web/form/ctx";

// components
import RedirectButton from "@web/redirect-btn/component";

// css
import styles from "./styles.module.css";

export default function StepWrapper(
    {
        children,
        nextBtnLabel = "Next",
        nextBtnType = "blue",
        nextCheck = () => {}, // nextCheck must return true (successfully validated) or false (not validated)
        hasSubmitBtn = false
    }
){
    const { sclForward } = useContext(FormStepIndexCtx);
    // const { steps } = useContext(FormStepsCtx);

    function handleNextBtnClick(){
        const r = nextCheck();

        // in case check is async function
        if (r instanceof Promise){
            r.then((value) => value && sclForward())
        }

        if (r){

            // // hide others
            // for(let i = 0; i < steps.length; i++) {        
            //     if(i != useContext(FormStepIndexCtx).index){
            //         steps[i].styles.display = "none";
            //     }
            // }

            sclForward();
        }
    }

    return (
        <li className={clsx("s_row_e", styles.step_con)}>
            <div className={styles.step}>
                <h1 className={clsx("s_title", styles.title)}>
                    Make an appointment
                </h1>

                {children}
                
                {
                    hasSubmitBtn ? 
                    <RedirectButton
                        label={nextBtnLabel}
                        type={nextBtnType}
                        onClick={handleNextBtnClick}
                        style={{marginTop: "25px"}}                 
                        isSubmit={true}
                    />:
                    <RedirectButton
                        label={nextBtnLabel}
                        type={nextBtnType}
                        onClick={handleNextBtnClick}
                        style={{marginTop: "25px"}}                 
                    />
                }
            </div>
        </li>
    )
}