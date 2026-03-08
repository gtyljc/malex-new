
"use client";

// others
import Image from "next/image";
import { useContext } from "react";
import { FormCtx } from "@web/form/ctx";

// images
import thumbnail from "./thumbnail.jpg";

interface InputsRowParams {
    children?: React.ReactNode
}

function InputsRow({ children }: InputsRowParams){
    return (
        <div className="w-full flex flex-col items-end gap-2.5 md:flex-row">
            { children }
        </div>
    )
}

interface InputLabelParams {
    children?: React.ReactElement,
    label: string
}

function InputLabel({children, label}: InputLabelParams){
    return (
        <div className="w-full">
            <span className="flex flex-row gap-1 after:text-scarlet-red after:content-['*'] mb-[7px]">
                { label }
            </span>
            { children }
        </div>
    )
}

interface TextInputParams {
    children?: React.ReactElement
}

function TextInput({ children }: TextInputParams){
    return <div className="input w-full">{ children }</div>
}

export default function FormPreviewSection () {
    const { openForm } = useContext(FormCtx);

    return (
        <section 
            className="
                w-full flex flex-row justify-center rounded-[10px] 
                overflow-hidden md:flex-row cursor-pointer
            " 
            onClick={ openForm }
        >
            <div 
                className="
                    w-full flex flex-col items-center bg-ice-blue p-8 box-border 
                    md:justify-center max-w-[560px] lg:max-w-none rounded-[10px] lg:rounded-none
                "
            >
                <div className="flex flex-col items-center gap-4 mb-5 md:mb-10">
                    <h1 className="section-title">We’re Here to Help.</h1>
                    <h2 className="text-lg">Contact us for a free consultation!</h2>
                </div>
                <div className="w-full flex flex-col gap-2.5 max-w-[450px]">
                    <InputsRow>
                        <InputLabel label="Name">
                            <TextInput />
                        </InputLabel>
                        <InputLabel label="Surname">
                            <TextInput />
                        </InputLabel>
                    </InputsRow>
                    <InputLabel label="Address">
                        <TextInput />
                    </InputLabel>
                    <InputLabel label="Job Description">
                        <TextInput />
                    </InputLabel>
                    <InputsRow>
                        <InputLabel label="The best way to get in touch">
                            <TextInput>
                                <span className="text-light-gray">WhatsApp</span>
                            </TextInput>
                        </InputLabel>
                        <TextInput>
                            <span className="text-light-gray">Number</span>
                        </TextInput>
                    </InputsRow>
                    <div className="redirect-btn redirect-btn-blue mt-2 min-h-[55px] md:mt-7">
                        <span>Contact Us Now!</span>
                    </div>
                </div>
            </div>
            <div className="w-full hidden lg:block">
                <Image 
                    src={ thumbnail }
                    alt="Contact us now!"
                    className="w-full h-full"
                />
            </div>
        </section>
    )
}