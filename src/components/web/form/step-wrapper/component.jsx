"use client";

// others
import { useContext } from "react";
import { FormCtx } from "@web/form/ctx";
import Image from "next/image";
import clsx from "clsx";

// css
import styles from "./styles.module.css";

// images
import close from "./close.svg";

export default function StepWrapper({ children }){
    const { closeForm } = useContext(FormCtx);

    return (
        <li className={clsx(styles.step, "row-el")}>
            <div className="w-full max-w-[570px]">
                <div className="w-full flex flex-row justify-end mb-4">
                    <button
                        className="flex flex-row justify-center items-center text-white text-base gap-2"
                        onClick={ closeForm }
                        type="button"
                    >
                        <span>Close</span>
                        <Image src={ close } alt="Close Malex appointment window" />
                    </button>
                </div>
            </div>
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
    )
}