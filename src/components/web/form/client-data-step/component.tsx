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
import { UseFormProps } from "react-hook-form";
import { SiteConfig } from "@src/lib/apollo-clients/frontend";

// components
import StepWrapper from "../step-wrapper/component";
import { NextButton } from "../step-wrapper/component";
import { frontendClient } from "@src/lib/apollo-clients/frontend";

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
    inputId: string;
    formObject: ReturnType<typeof useForm>;
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
    id: string;
    formObject: ReturnType<typeof useForm<FormValues>>;
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
    id: string;
    label: string;
    formObject: ReturnType<typeof useForm<FormValues>>;
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
    id: string;
    options: Record<string, string>[];
    formObject: ReturnType<typeof useForm<FormValues>>;
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
const STEP_I = 0;

function createValidationSchema(siteConfig: SiteConfig) {
    return z.object(
        {
            name: z.string().min(1).max(50).regex(tools.ENG_LANGUAGE_REGEX),
            surname: z.string().min(1).max(50).regex(tools.ENG_LANGUAGE_REGEX),
            address: z.string().min(1).max(255),
            job_desc: z.string().min(1).max(500),
            bwt: z.enum(["WHATSAPP", "TEXT", "PHONE"]),
            phone_number: z.string().refine(
                v => {
                    const ast = new AsYouType(siteConfig.cCountry);

                    ast.input(v);

                    return ast.isValid();
                }
            ),
        }
    )
}

type FormValues = {
    name: string;
    surname: string;
    address: string;
    job_desc: string;
    bwt: "WHATSAPP" | "TELEGRAM" | "PHONE";
    phone_number: string;
};

const useFormHookProps = (siteConfig: SiteConfig): UseFormProps<FormValues> => (
    {
        defaultValues: {
            name: "",
            surname: "",
            address: "",
            job_desc: "",
            bwt: "WHATSAPP",
            phone_number: "",
        },
        resetOptions: { keepDefaultValues: true },
        resolver: zodResolver(createValidationSchema(siteConfig)),
        mode: "onChange",
    }
)

// should be insert in ul
export default function ClientDataStep() {
    const { siteConfig } = frontendClient;
    const formObject = useForm<FormValues>(useFormHookProps(siteConfig));
    const { inputData } = useContext(FormCtx);

    return (
        <StepWrapper sIndex={STEP_I}>
            <h1 className="mb-7 text-center text-2xl font-medium">
                Make an appointment
            </h1>
            <div className="w-full flex flex-col gap-4 max-w-[430px]">
                <InputsRow>
                    <InputCon inputId="name" formObject={formObject}>
                        <TextInputWithLabel
                            id="name"
                            label="Name"
                            props={{ maxLength: 50, placeholder: "Your name" }}
                            formObject={formObject}
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
                <InputCon inputId="job_desc" formObject={formObject}>
                    <TextInputWithLabel
                        id="job_desc"
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
                    <InputCon inputId="phone_number" formObject={formObject}>
                        <TextInput
                            id="phone_number"
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