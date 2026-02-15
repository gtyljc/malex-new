"use client";

// tools
import { useState, createContext } from "react";

export const FormCtx = createContext();

export function FormProvider({ children }){

    // open / close
    const [ isOpened, changeState ] = useState(false);
    const openForm = () => changeState(true);
    const closeForm = () => changeState(false);

    // scroll
    const [ index, setIndex ] = useState(0);
    const sclForward = () => setIndex(i => i + 1);
    const sclBackward = () => setIndex(i => i - 1);
    const [ isScrolling, setScrollFlag ] = useState(false);
    const [ sDirection, setSDirection ] = useState("right"); // scroll direction

    // input from user
    const [ inputData ] = useState(
        {
            name: null,
            surname: null,
            address: null,
            job_desc: null,
            bwt: null,
            phone_number: null,
            date: null
        }
    );

    // submit
    const [ isSubmited, setSubmitState ] = useState(false);
    const [ isWaitingOnResponse, setWaitingState ] = useState(false);
    const [ responseState, setResponseState ] = useState(false); // false => unsuccess; true => success

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
                    isScrolling,
                    setScrollFlag,
                    sDirection,
                    setSDirection,

                    inputData,
                    
                    // submit
                    isSubmited,
                    setSubmitState,
                    isWaitingOnResponse,
                    setWaitingState,
                    setResponseState,
                    responseState
                } 
            }
        >
            { children }
        </FormCtx>
    )
}