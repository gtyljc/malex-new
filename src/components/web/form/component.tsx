"use client";

// others
import clsx from "clsx";
import { useContext } from "react";
import { FormCtx } from "./ctx";
import Image from "next/image";
import { useApolloClient } from "@apollo/client/react";
import * as queries from "@lib/apollo-clients/queries";

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
        inputData,
        setWaitingState,
        setResponseState
    } = useContext(FormCtx);
    const client = useApolloClient();

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
                    e.preventDefault(); // remove page reload

                    setWaitingState(true);

                    const { error, data } = await client.mutate(
                        {
                            mutation: queries.RegisterAppontmentDocument,
                            variables: { 
                                data: {
                                    name: inputData.name,
                                    surname: inputData.surname,
                                    address: inputData.address,
                                    job_desc: inputData.jobDesc,
                                    bwt: inputData.bwt,
                                    phone_number: inputData.phoneNumber,
                                    date: inputData.date.tz().format()
                                } 
                            } 
                        }
                    );
                
                    setWaitingState(false);

                    if (error || !data.registerAppointment.success) setResponseState(false);
                    else setResponseState(true);
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