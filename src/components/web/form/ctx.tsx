"use client";

// tools
import { useState, createContext } from "react";
import * as types from "@lib/types";
import { dayjs } from "@lib/dayjs";

type Direction = "left" | "right";

interface InputData {
    name: null | string,
    surname: null | string,
    address: null | string,
    jobDesc: null | string,
    bwt: types.BWT | null,
    phoneNumber: string | null,
    date: string | dayjs.Dayjs
}

interface FormCtx {
    isOpened: boolean | undefined,
    openForm: Function | undefined,
    closeForm: Function | undefined,
    index: number | undefined,
    sclForward: Function | undefined,
    sclBackward: Function | undefined,
    isScrolling: boolean | undefined,
    setScrollFlag: Function | undefined,
    sDirection: Direction | undefined,
    setSDirection: Function | undefined,
    inputData: InputData | undefined,
    isSubmited: boolean | undefined,
    setSubmitState: Function | undefined,
    isWaitingOnResponse: boolean | undefined,
    setWaitingState: Function | undefined,
    setResponseState: Function | undefined,
    responseState: boolean | undefined
}

export const FormCtx = createContext<FormCtx>(
    {
        isOpened: undefined,
        openForm: undefined,
        closeForm: undefined,
        index: undefined,
        sclBackward: undefined,
        isScrolling: undefined,
        setScrollFlag: undefined,
        sDirection: undefined,
        setSDirection: undefined,
        sclForward: undefined,
        inputData: undefined,
        isSubmited: undefined,
        setSubmitState: undefined,
        isWaitingOnResponse: undefined,
        setWaitingState: undefined,
        setResponseState: undefined,
        responseState: undefined
    }
);

export function FormProvider({ children }){

    // open / close
    const [ isOpened, changeState ] = useState<boolean>(false);
    const openForm = (): void => changeState(true);
    const closeForm = (): void => changeState(false);

    // scroll
    const [ index, setIndex ] = useState<number>(0);
    const sclForward = (): void => setIndex(i => i + 1);
    const sclBackward = (): void => setIndex(i => i - 1);
    const [ isScrolling, setScrollFlag ] = useState<boolean>(false);
    const [ sDirection, setSDirection ] = useState<Direction>("right"); // scroll direction

    // input from user
    const [ inputData ] = useState<InputData>(
        {
            name: null,
            surname: null,
            address: null,
            jobDesc: null,
            bwt: null,
            phoneNumber: null,
            date: null
        }
    );

    // submit
    const [ isSubmited, setSubmitState ] = useState<boolean>(false);
    const [ isWaitingOnResponse, setWaitingState ] = useState<boolean>(false);
    const [ responseState, setResponseState ] = useState<boolean>(false); // false => unsuccess; true => success

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