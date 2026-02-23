"use client";

// others
import Link from "next/link";
import StepWrapper from "../step-wrapper/component";
import Image from "next/image";
import { FormCtx } from "@web/form/ctx";
import { useContext } from "react";
import LoadingSection from "@web/loading-section/component";

// images
import finished from "./finished.svg";
import declined from "./declined.svg";

function ResponseState({ title, message, icon }){
    const { closeForm } = useContext(FormCtx);

    return (
        <div className="flex flex-col items-center gap-4">
            <Image
                src={ icon }
                alt="Appointment is finished!"
                className="size-22"
            />
            <h1 className="text-center text-2xl font-semibold">
                { title }
            </h1>
            <p className="max-w-[320px] text-[15px]/6 text-center mt-2">{ message }</p>
            <Link
                href="/"
                className="redirect-btn redirect-btn-white  mt-8 min-[450px]:max-w-[250px]"
                onClick={ () => closeForm() }
            >
                <span>Back to Home</span>
            </Link>
        </div>
    )
}

const STEP_I = 3;

export default function FinishStep(){
    const { isWaitingOnResponse, responseState } = useContext(FormCtx);
    
    return (
        <StepWrapper sIndex={ STEP_I }>
            {
                isWaitingOnResponse ? <LoadingSection/>:
                ( 
                    responseState ? 
                    <ResponseState 
                        title="Thank you!" 
                        message="We will contact you as soon as possible!" 
                        icon={ finished }
                    />:
                    <ResponseState 
                        title="Sorry, something went wrong!"
                        message="Unfortunately, we are currently unable to accept your application. Please try again a little later."
                        icon={ declined }
                    />
                )
            }
        </StepWrapper>
    )
}