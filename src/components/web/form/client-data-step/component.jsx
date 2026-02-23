"use client";

// others
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCtx } from "../ctx";
import { useContext } from "react";
import * as z from "zod";
import * as tools from "@src/lib/tools";
import { AsYouType } from "libphonenumber-js/min";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton } from "../step-wrapper/component";
import { useFrontendClient } from "@src/lib/apollo-clients/frontend";

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
const STEP_I = 0;

function createValidationSchema(config){
    return z.object(
        {
            name: z.string().min(1).max(50).regex(tools.ENG_LANGUAGE_REGEX),
            surname: z.string().min(1).max(50).regex(tools.ENG_LANGUAGE_REGEX),
            address: z.string().min(1).max(255),
            job_desc: z.string().min(1).max(500),
            bwt: z.enum(["WHATSAPP", "TEXT", "PHONE"]),
            phone_number: z.string().refine(
                v => {
                    const ast = new AsYouType(config.c_country);

                    ast.input(v);

                    return ast.isValid();
                } 
            ),
        }
    )
}

// should be insert in ul
export default function ClientDataStep() {
    const { siteConfig } = useFrontendClient();
    const formObject = useForm(
        {
            defaultValues: {
                "name": "",
                "surname": "",
                "address": "",
                "job_desc": "",
                "bwt": "WHATSAPP",
                "phone_number": ""
            },
            resetOptions: { keepDefaultValues: true },
            resolver: zodResolver(createValidationSchema(siteConfig)),
            mode: "onChange"
        }
    );
    const { inputData } = useContext(FormCtx);

    return (
        <StepWrapper sIndex={ STEP_I }>
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <div className="w-full flex flex-col gap-4 max-w-[430px]">
                <InputsRow>
                    <InputCon input_id="name" formObject={ formObject }>
                        <TextInputWithLabel 
                            id="name" 
                            label="Name" 
                            props={ { maxLength: 50, placeholder: "Your name" } } 
                            formObject={ formObject }
                        />
                    </InputCon>
                    <InputCon input_id="surname" formObject={ formObject }>
                        <TextInputWithLabel 
                            id="surname" 
                            label="Surname" 
                            props={ { maxLength: 50, placeholder: "Your surname" } } 
                            formObject={ formObject }
                        />
                    </InputCon>
                </InputsRow>                
                <InputCon input_id="address" formObject={ formObject }>
                    <TextInputWithLabel 
                        id="address" 
                        label="Address" 
                        props={ { maxLength: 255, placeholder: "Your address" } } 
                        formObject={ formObject }
                    />
                </InputCon>                
                <InputCon input_id="job_desc" formObject={ formObject }>
                    <TextInputWithLabel 
                        id="job_desc" 
                        label="Job description" 
                        props={ { maxLength: 500, placeholder: "Tell us what to do" } } 
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
                                    { name: "Whatsapp", value: "WHATSAPP" },
                                    { name: "Phone", value: "PHONE" },
                                    { name: "Text", value: "TEXT" }
                                ]
                            }
                            formObject={ formObject }
                        />
                    </InputCon>
                    <InputCon input_id="phone_number" formObject={ formObject }>
                        <TextInput 
                            id="phone_number" 
                            props={ { maxLength: 20, placeholder: "Number" } }
                            formObject={ formObject }
                        />
                    </InputCon>
                </InputsRow>
            </div>
            <NextButton 
                onClick={ 
                    async () => {

                        // validate all fields
                        if (await formObject.trigger()){
                            const {
                                name,
                                surname,
                                address,
                                job_desc,
                                bwt,
                                phone_number
                            } = formObject.getValues();
                            
                            inputData.name = name;
                            inputData.surname = surname;
                            inputData.address = address;
                            inputData.job_desc = job_desc;
                            inputData.bwt = bwt;
                            inputData.phone_number = phone_number;

                            return true;
                        }

                        return false
                    } 
                } 
            />
        </StepWrapper>
    )
}