"use client";

// tools
import { useState, createContext } from "react";

// this context will contain state of form opened (true) or not (false)
export const FormOpenCtx = createContext();
export const FormStepIndexCtx = createContext();
export const FormStepsCtx = createContext();

export function FormProvider({ children }){

    // open ctx
    const [isOpened, changeState] = useState(false);
    const openForm = () => changeState(true);
    const closeForm = () => changeState(false);

    // steps
    const [index, setIndex] = useState(0);
    const sclForward = () => setIndex(i=> i + 1);
    const sclBack = () => setIndex(i => i - 1);

    // const [steps, setSteps] = useState(null);

    return (
        // <FormStepsCtx value={{steps, setSteps}}>
            <FormStepIndexCtx
                value={
                    {index, sclBack, sclForward}
                }
            >
                <FormOpenCtx 
                    value={
                        {isOpened, openForm, closeForm}
                    }
                >
                    {children}
                </FormOpenCtx>
            </FormStepIndexCtx>
        // </FormStepsCtx>
    )
}