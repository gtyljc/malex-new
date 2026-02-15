"use client";

export default function Error({ error, reset }){
    return (
        <div className="">
            <span>{ error.name }</span>
        </div>
    )
}