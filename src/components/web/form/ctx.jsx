"use client";

// tools
import { useState, createContext } from "react";

export const FormCtx = createContext();

export function FormProvider({ children }){
    
    // choosen date
    const [ choosenDate, setDate ] = useState(null);

    // open / close
    const [ isOpened, changeState ] = useState(false);
    const openForm = () => changeState(true);
    const closeForm = () => changeState(false);

    // scroll
    const [ index, setIndex ] = useState(0);
    const sclForward = () => setIndex(i=> i + 1);
    const sclBackward = () => setIndex(i => i - 1);

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
                    sclBackward, 
                    sclForward,

                    // choosen date (second and third steps need it)
                    choosenDate,
                    setDate
                } 
            }
        >
            { children }
        </FormCtx>
    )
}