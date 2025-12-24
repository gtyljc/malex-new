"use client";

// others
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCtx } from "../ctx";
import * as z from "zod";
import { useContext } from "react";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton } from "../step-wrapper/component";

const enRegex = /^[A-Za-z]+$/;
const phoneRegex = /^(?:\+[1-9][0-9]{7,14}|[0-9]{10})$/;
const onlyDecimalRegex = /[^\d+]/g;
const schema = z.object(
    {
        name: z.string().min(1).max(50).regex(enRegex),
        surname: z.string().min(1).max(50).regex(enRegex),
        address: z.string().min(1).max(255),
        job_desc: z.string().min(1).max(500),
        bwt: z.enum(["whatsapp", "text", "phone"]),
        number: z.string().transform(v => v.replace(onlyDecimalRegex, "")).refine(v => phoneRegex.test(v))
    }
);

function InputsRow ({ children }) {
    return (
        <div className="w-full flex flex-col gap-2.5 min-[450px]:flex-row">
            { children }
        </div>
    )
}

function InputCon ({ children, input_id, formObject }) { // errors from formState
    return (
        <div className={
                clsx(
                    "w-full flex flex-col justify-end relative",
                    formObject.formState.errors[input_id] && clsx(
                        "after:content-['error'] after:absolute",
                        "after:right-0 after:text-scarlet-red",
                        "after:-bottom-5"
                    )
                )
            }
        >
            { children }
        </div>
    )
}

function TextInput({ id, formObject, props }){
    return (
        <input
            className={
                clsx(
                    "input",
                    formObject.formState.errors[id] && "border-scarlet-red"
                )
            }
            { ...formObject.register(id) }
            name={ id }
            type="text"
            { ...props }
        />
    )
}

function InputLabel({ children, label }){
    return (
        <label>
            <span
                className="
                    w-full flex flex-row gap-1 text-sm mb-[7px]
                    after:text-scarlet-red after:content-['*']
                "
            >
                { label }
            </span>
            { children }
        </label>
    )
}

function TextInputWithLabel({ id, label, formObject, props }){
    return (
        <InputLabel label={ label }>
            <input
                { ...formObject.register(id) }
                type="text"
                className={
                    clsx(
                        "input",
                        formObject.formState.errors[id] && "border-scarlet-red"
                    )
                }
                name={ id }
                { ...props }
            />
        </InputLabel>
    )
}

function SelectInputWithLabel({ id, options, label, formObject }){ // options => [{ name: "Example", value: "example" }]
    return (
        <InputLabel label={ label }>
            <select 
                { ...formObject.register(id) }
                className="input"
                name={ id }
            >
                { options.map(e => <option value={ e.value } key={ e.name }>{ e.name }</option>) }
            </select>
        </InputLabel>
    )
}

// should be insert in ul
export default function FirstFormStep() {
    const formObject = useForm(
        {
            defaultValues: {
                "name": "",
                "surname": "",
                "address": "",
                "job_desc": "",
                "bwt": "whatsapp",
                "number": ""
            },
            resetOptions: {
                keepDefaultValues: true
            },
            resolver: zodResolver(schema),
            mode: "onChange"
        }
    );
    const { sclForward } = useContext(FormCtx);

    return (
        <StepWrapper>
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <div className="w-full flex flex-col gap-2.5 max-w-[430px]">
                <InputsRow>
                    <InputCon input_id="name" formObject={ formObject }>
                        <TextInputWithLabel 
                            id="name" 
                            label="Name" 
                            props={ { maxLength: 50 } } 
                            formObject={ formObject }
                        />
                    </InputCon>
                    <InputCon input_id="surname" formObject={ formObject }>
                        <TextInputWithLabel 
                            id="surname" 
                            label="Surname" 
                            props={ { maxLength: 50 } } 
                            formObject={ formObject }
                        />
                    </InputCon>
                </InputsRow>                
                <InputCon input_id="address" formObject={ formObject }>
                    <TextInputWithLabel 
                        id="address" 
                        label="Address" 
                        props={ { maxLength: 255 } } 
                        formObject={ formObject }
                    />
                </InputCon>                
                <InputCon input_id="job_desc" formObject={ formObject }>
                    <TextInputWithLabel 
                        id="job_desc" 
                        label="Job description" 
                        props={ { maxLength: 500 } } 
                        formObject={ formObject }
                    />
                </InputCon>
                <InputsRow>
                    <InputCon input_id="bwt" formObject={ formObject }>
                        <SelectInputWithLabel
                            id="bwt"
                            label="The best way to get in touch"
                            options={
                                [
                                    { name: "Whatsapp", value: "whatsapp" },
                                    { name: "Phone", value: "phone" },
                                    { name: "Text", value: "text" }
                                ]
                            }
                            formObject={ formObject }
                        />
                    </InputCon>
                    <InputCon input_id="number" formObject={ formObject }>
                        <TextInput 
                            id="number" 
                            props={ { maxLength: 20, placeholder: "Number" } }
                            formObject={ formObject }
                        />
                    </InputCon>
                </InputsRow>
            </div>
            <NextButton onClick={ async () => { await formObject.trigger() && sclForward() } } />
        </StepWrapper>
    )
}