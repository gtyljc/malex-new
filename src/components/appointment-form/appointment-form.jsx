"use client"

// tools
import clsx from "clsx"
import { createContext, useContext, useState } from "react"

// css
import styles from "./appointment-form.module.css"

const AppointmentFormCtx = createContext();

export function AppointmentFormProvider({children}){
    const [isOpened, changeState] = useState(false);

    return (
        <AppointmentFormCtx value={{isOpened, changeState}}>
            {children}
        </AppointmentFormCtx>
    )
}

export default function AppointmentForm() {
    return (
        <div 
            className={
                clsx(
                    useContext(AppointmentFormCtx) && styles.form_overlap_closed,
                    styles.form_overlap
                )
            }
        >
            <form action="" method="POST" className={styles.form}>
                <div className={styles.close_btn_con}>
                    <button className={styles.close_btn}>

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
                    <div className={
                        clsx(
                            "s_row",
                            styles.steps_row
                        )
                    }>
                        <div className={styles.step}>
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}