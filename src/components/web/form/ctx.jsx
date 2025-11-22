"use client";

// tools
import { useState, createContext } from "react";

// this context will contain state of form opened (true) or not (false)
export const FormCtx = createContext();

export function FormProvider({ children }){
    
    // open / close
    const [ isOpened, changeState ] = useState(false);
    const openForm = () => changeState(true);
    const closeForm = () => changeState(false);

    // scroll
    const [ index, setIndex ] = useState(1);
    const sclForward = () => setIndex(i=> i + 1);
    const sclBack = () => setIndex(i => i - 1);

    return (
        <FormCtx
            value={
                {   
                    // open/close
                    isOpened,
                    openForm,
                    closeForm,

                    // scroll
                    index, 
                    sclBack, 
                    sclForward
                } 
            }
        >
            { children }
        </FormCtx>
    )
}