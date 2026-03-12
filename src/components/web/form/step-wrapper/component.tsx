"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { FormCtx } from "../ctx";

// css
import styles from "./styles.module.css";

interface NextButtonParams {
    onClick: Function,
    isSubmit?: boolean,
    args?: Record<string, any>
}

export function NextButton({ onClick, isSubmit = false }: NextButtonParams){ // onClick must be a check and return boolean value
    const { setSDirection, setScrollFlag, sclForward } = useContext(FormCtx);

    return (
        <button
            className="redirect-btn redirect-btn-blue mt-8 min-[450px]:max-w-[250px]"
            onClick={ 
                async () => {
                    const r = onClick();

                    if (r instanceof Promise ? await r: r){
                        sclForward();
                        setSDirection("right"); 
                        setScrollFlag(true);
                    }
                }
            }
            { ...(isSubmit ? { type: "submit" }: { type: "button" }) }
        >
            <span>Next</span>
        </button>
    )
}

export function BackButton(){
    const { setSDirection, setScrollFlag, sclBackward } = useContext(FormCtx);

    return (
        <button 
            className="redirect-btn redirect-btn-circled mt-8 min-[450px]:max-w-[250px]"
            onClick={ 
                () => { 
                    sclBackward(); 
                    setSDirection("left"); 
                    setScrollFlag(true); 
                } 
            }
            type="button"
        >
            <span>Back</span>
        </button>
    )
}

interface ScrollBtnsConParams {
    children: React.ReactNode
}

export function ScrollBtnsCon({ children }: ScrollBtnsConParams){
    return (
        <div className="w-full flex flex-row gap-2">
            { children }
        </div>
    )
}

interface StepWrapperParams {
    children: React.ReactNode,
    sIndex: number
}

export default function StepWrapper({ children, sIndex }: StepWrapperParams){
    const { index, isScrolling, sDirection } = useContext(FormCtx);
    const step = (
        <li className={clsx(styles.step, "row-el")}>
            <div 
                className={
                    clsx(
                        "w-full flex flex-col items-center bg-white pr-7 pl-7", 
                        "pt-10 pb-7 rounded-[10px] max-w-[570px]"
                    )
                }
            >
                { children }
            </div>
        </li>
    );
    
    const previousI = sDirection == "right" ? index - 1: index + 1;

    return index == sIndex ? step: isScrolling && previousI == sIndex && step ;
}