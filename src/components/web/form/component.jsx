"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { createAppointment } from "./actions";
import { FormCtx } from "./ctx";
import Image from "next/image";

// components
import ClientDataStep from "./client-data-step/component";
import DateStep from "./date-step/component";
import TimeStep from "./time-step/component";
import FinishStep from "./finish-step/component";

// css
import styles from "./styles.module.css";

// images
import close from "./close.svg";

export default function Form() {
    // all buttons inside form must be with attribute type = "button"
    
    const { 
        isOpened, 
        closeForm, 
        setScrollFlag, 
        isScrolling, 
        sDirection, 
        inputData 
    } = useContext(FormCtx);

    return (
        <form
            className={
                clsx(
                    styles.form,
                    "bg-graphite/45",
                    !isOpened && "pointer-events-none opacity-0!"
                )
            }
            onClick={ (e) => { if (e.target === e.currentTarget) closeForm() } }
            onSubmit={ 
                async (e) => {
                    console.log("plwdpldwlp")

                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    formData.set("name", inputData.name);
                    formData.set("surname", inputData.surname);
                    formData.set("address", inputData.address);
                    formData.set("job_desc", inputData.job_desc);
                    formData.set("bwt", inputData.bwt);
                    formData.set("phone_number", inputData.phone_number)
                    formData.set("date", inputData.date)
                    
                    await createAppointment(formData);
                }
            }
        >
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
            <div className="row-con max-w-[1200px] overflow-hidden">
                <ul
                    className={ 
                        clsx(
                            "row",
                            isScrolling && "row-animation", 
                            sDirection == "right" && "justify-start",
                            sDirection == "left" && "justify-end"
                        ) 
                    }
                    style={ { transform: isScrolling && `translateX(${ sDirection == "right" ? "-": "" }100%)` } }
                    onTransitionStart={ (e) => { if (e.target === e.currentTarget) setScrollFlag(true) } }
                    onTransitionEnd={ (e) => { if (e.target === e.currentTarget) setScrollFlag(false) } }
                >   
                    <ClientDataStep />                
                    <DateStep />
                    <TimeStep />
                    <FinishStep />
                </ul>
            </div>
        </form>
    )
}