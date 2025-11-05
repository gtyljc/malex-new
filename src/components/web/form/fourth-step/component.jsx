"use client";

// others
import StepWrapper from "../step-wrapper/component";
import Image from "next/image";
import { FormOpenCtx } from "@web/form/ctx";
import { useContext } from "react";

// css
import styles from "./styles.module.css";

// images
import finished_svg from "./finished.svg"

export default function FourthFormStep(){
    const { closeForm } = useContext(FormOpenCtx);
    
    return (
        <StepWrapper
            nextBtnType="white"
            nextBtnLabel="Back to Home"
            nextCheck={() => { closeForm() }}
        >
            <Image
                className={styles.icon}
                src={finished_svg}
                alt="Appointment is finished!"
            />
            <h2 className={styles.undertitle}>We will contact you as soon as possible!</h2>
        </StepWrapper>
    )
}