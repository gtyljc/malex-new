
// tools
import clsx from "clsx";

// components
import MainFormStepWrapper from "@components/main-form-step-wrapper/component";

// css
import styles from "./styles.module.css";


function AppointmentTime(){

}

function SelectTime(){
    const arr = [];

    // for(let i = 0){

    // }

    return arr;
}

export default function ThirdFormStep() {


    return (
        <MainFormStepWrapper
            nextCheck={
                () => {

                }
            }
        >
            <h1 
                className={
                    clsx(
                        styles.title,
                        "s_title"
                    )
                }
            >
                Make an appointment
            </h1>
            <h2 className={styles.undertitle}>Select a date</h2>
            <SelectTime/>
        </MainFormStepWrapper>
    )    
};