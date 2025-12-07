"use client";

// others
import Link from "next/link";
import StepWrapper from "../step-wrapper/component";
import Image from "next/image";
import { FormCtx } from "@web/form/ctx";
import { useContext } from "react";

// images
import finished from "./finished.svg"

export default function FourthFormStep(){
    const { closeForm } = useContext(FormCtx);
    
    return (
        <StepWrapper>
            <div className="flex flex-col items-center gap-4">
                <Image
                    src={ finished }
                    alt="Appointment is finished!"
                    className="size-22"
                />
                <h1 className="text-center text-2xl font-semibold">
                    Thank you!
                </h1>
                <h2>We will contact you as soon as possible!</h2>
                <Link
                    href="/"
                    className="redirect-btn redirect-btn-white  mt-8 min-[450px]:max-w-[250px]"
                    onClick={ () => closeForm() }
                >
                    <span>Back to Home</span>
                </Link>
            </div>
        </StepWrapper>
    )
}