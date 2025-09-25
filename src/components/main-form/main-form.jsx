"use client";

// tools
import clsx from "clsx";
import { useContext } from "react";
import Image from "next/image";
import { createAppointment } from "./actions";
import { MainFormCtx } from "./ctx";

// components
import FirstFormStep from "@/components/f-form-step/f-form-step";
import SecondFormStep from "@/components/s-form-step/s-form-step";
import ThirdFormStep from "@/components/t-form-step/t-form-step";

// css
import styles from "./main-form.module.css";

// images
import close_svg from "./close.svg";


export default function MainForm() {    
    function handleCloseBtnClick(){
        const [isOpened, changeState] = useContext(MainFormCtx);    
        
        if (isOpened){
            changeState(false);
        }
        else {
            changeState(true);
        }
    }

    console.log(!useContext(MainFormCtx).isOpened);

    return (
        <div 
            className={
                clsx(
                    !useContext(MainFormCtx).isOpened && styles.overlap_closed,
                    styles.overlap
                )
            }
        >
            <form action={createAppointment} className={styles.form}>
                <div className={styles.close_btn_con}>
                    <button className={styles.close_btn} onClick={handleCloseBtnClick}>
                        <span>Close</span>
                        <Image 
                            src={close_svg} 
                            alt="Close Malex appointment window" 
                        />
                    </button>
                </div>
                <div 
                    className={
                        clsx(
                            "s_row_con",
                            styles.steps_row_con
                        )
                    }
                >
                    <ul className={
                        clsx(
                            "s_row",
                            styles.steps_row
                        )
                    }>
                        <FirstFormStep

                        />
                        <SecondFormStep
                        
                        />
                        <ThirdFormStep
                        
                        />
                    </ul>
                </div>
            </form>
        </div>
    )
}