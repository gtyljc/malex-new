"use client";

// others
import clsx from "clsx";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCtx } from "../ctx";
import { useContext } from "react";
import * as z from "zod";
import * as tools from "@src/lib/tools";
import { AsYouType } from "libphonenumber-js/min";
import { UseFormProps } from "react-hook-form";
import { SiteConfig } from "@src/lib/apollo-clients/client";
import * as types from "@lib/types";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton } from "../step-wrapper/component";
import { clientAC } from "@src/lib/apollo-clients/client";

type FormValues = {
    name: string;
    surname: string;
    address: string;
    jobDesc: string;
    bwt: types.BWT;
    phoneNumber: string;
};

interface InputsRowParams {
    children: React.ReactNode
}

function InputsRow({ children }: InputsRowParams) {
    return (
        <div className="w-full flex flex-col gap-2.5 min-[450px]:flex-row">
            {children}
        </div>
    )
}

interface InputCon {
    children: React.ReactNode;
    inputId: keyof FormValues;
    formObject: UseFormReturn<FormValues>;
}

function InputCon({ children, inputId, formObject }: InputCon) { // errors from formState
    return (
        <div className={
            clsx(
                "w-full flex flex-col justify-end relative",
                formObject.formState.errors[inputId] && clsx(
                    "after:content-['error'] after:absolute",
                    "after:right-0 after:text-scarlet-red",
                    "after:-bottom-5"
                )
            )
        }
        >
            {children}
        </div>
    )
}

interface TextInput {
    id: keyof FormValues;
    formObject: UseFormReturn<FormValues>;
    props: Record<string, any>;
}

function TextInput({ id, formObject, props }: TextInput) {
    return (
        <input
            className={
                clsx(
                    "input",
                    formObject.formState.errors[id] && "border-scarlet-red"
                )
            }
            {...formObject.register(id)}
            name={id}
            type="text"
            {...props}
        />
    )
}

interface InputLabel {
    children: React.ReactNode;
    label: string;
}

function InputLabel({ children, label }: InputLabel) {
    return (
        <label>
            <span
                className="
                    w-full flex flex-row gap-1 text-sm mb-[7px]
                    after:text-scarlet-red after:content-['*']
                "
            >
                {label}
            </span>
            {children}
        </label>
    )
}

interface TextInputWithLabelParams {
    id: keyof FormValues;
    label: string;
    formObject: UseFormReturn<FormValues>;
    props: Record<string, any>;
}

function TextInputWithLabel({ id, label, formObject, props }: TextInputWithLabelParams) {
    return (
        <InputLabel label={ label }>
            <input
                {...formObject.register(id)}
                type="text"
                className={
                    clsx(
                        "input",
                        formObject.formState.errors[id] && "border-scarlet-red"
                    )
                }
                name={id}
                {...props}
            />
        </InputLabel>
    )
}

interface SelectInputWithLabelParams {
    id: keyof FormValues;
    options: Record<string, string>[];
    formObject: UseFormReturn<FormValues>;
    label: string;
}

function SelectInputWithLabel({ id, options, label, formObject }: SelectInputWithLabelParams) {
    return (
        <InputLabel label={label}>
            <select
                {...formObject.register(id)}
                className="input"
                name={id}
            >
                {options.map(e => <option value={e.value} key={e.name}>{e.name}</option>)}
            </select>
        </InputLabel>
    )
}

function createValidationSchema(siteConfig: SiteConfig) {
    return z.object(
        {
            name: z.string().min(1).max(50).regex(tools.ENG_LANGUAGE_REGEX),
            surname: z.string().min(1).max(50).regex(tools.ENG_LANGUAGE_REGEX),
            address: z.string().min(1).max(255),
            jobDesc: z.string().min(1).max(500),
            bwt: z.enum(["WHATSAPP", "TEXT", "PHONE"]),
            phoneNumber: z.string().refine(
                v => {
                    const ast = new AsYouType(siteConfig.cCountry);

                    ast.input(v);

                    return ast.isValid();
                }
            ),
        }
    )
}

const useFormHookProps = (siteConfig: SiteConfig): UseFormProps<FormValues> => (
    {
        defaultValues: {
            name: "",
            surname: "",
            address: "",
            jobDesc: "",
            bwt: "WHATSAPP",
            phoneNumber: "",
        },
        resetOptions: { keepDefaultValues: true },
        resolver: zodResolver(createValidationSchema(siteConfig)),
        mode: "onChange",
    }
)

const STEP_I = 0;

// should be insert in ul
export default function ClientDataStep() {
    const { siteConfig } = clientAC;
    const formObject = useForm<FormValues>(useFormHookProps(siteConfig));
    const { inputData } = useContext(FormCtx);

    return (
        <StepWrapper sIndex={STEP_I}>
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <div className="w-full flex flex-col gap-4 max-w-[430px]">
                <InputsRow>
                    <InputCon inputId="name" formObject={ formObject }>
                        <TextInputWithLabel
                            id="name"
                            label="Name"
                            props={{ maxLength: 50, placeholder: "Your name" }}
                            formObject={ formObject }
                        />
                    </InputCon>
                    <InputCon inputId="surname" formObject={formObject}>
                        <TextInputWithLabel
                            id="surname"
                            label="Surname"
                            props={{ maxLength: 50, placeholder: "Your surname" }}
                            formObject={formObject}
                        />
                    </InputCon>
                </InputsRow>
                <InputCon inputId="address" formObject={formObject}>
                    <TextInputWithLabel
                        id="address"
                        label="Address"
                        props={{ maxLength: 255, placeholder: "Your address" }}
                        formObject={formObject}
                    />
                </InputCon>
                <InputCon inputId="jobDesc" formObject={formObject}>
                    <TextInputWithLabel
                        id="jobDesc"
                        label="Job description"
                        props={{ maxLength: 500, placeholder: "Tell us what to do" }}
                        formObject={formObject}
                    />
                </InputCon>
                <InputsRow>
                    <InputCon inputId="bwt" formObject={formObject}>
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
                            formObject={formObject}
                        />
                    </InputCon>
                    <InputCon inputId="phoneNumber" formObject={formObject}>
                        <TextInput
                            id="phoneNumber"
                            props={{ maxLength: 20, placeholder: "Number" }}
                            formObject={formObject}
                        />
                    </InputCon>
                </InputsRow>
            </div>
            <NextButton
                onClick={
                    async () => {

                        // validate all fields
                        if (await formObject.trigger()) {
                            const {
                                name,
                                surname,
                                address,
                                jobDesc,
                                bwt,
                                phoneNumber
                            } = formObject.getValues();

                            inputData.name = name;
                            inputData.surname = surname;
                            inputData.address = address;
                            inputData.jobDesc = jobDesc;
                            inputData.bwt = bwt;
                            inputData.phoneNumber = phoneNumber;

                            return true;
                        }

                        return false
                    }
                }
            />
        </StepWrapper>
    )
}