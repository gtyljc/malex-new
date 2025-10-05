"use client";

// tools
import { useState, createContext } from "react";

// this context will contain state of form opened (true) or not (false)
export const MainFormOpenCtx = createContext();
export const MainFormStepIndexCtx = createContext();
export const MainFormStepsCtx = createContext();

export function MainFormProviders({ children }){

    // open ctx
    const [isOpened, changeState] = useState(false);
    const openForm = () => changeState(true);
    const closeForm = () => changeState(false);

    // steps
    const [index, setIndex] = useState(2);
    const sclForward = () => setIndex(i => i + 1);
    const sclBack = () => setIndex(i => i - 1);

    // const [steps, setSteps] = useState(null);

    return (
        // <MainFormStepsCtx value={{steps, setSteps}}>
            <MainFormStepIndexCtx
                value={
                    {index, sclBack, sclForward}
                }
            >
                <MainFormOpenCtx 
                    value={
                        {isOpened, openForm, closeForm}
                    }
                >
                    {children}
                </MainFormOpenCtx>
            </MainFormStepIndexCtx>
        // </MainFormStepsCtx>
    )
}