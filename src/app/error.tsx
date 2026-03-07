"use client";

export default function Error({ error }){
    return (
        <div className="">
            <span>{ error.name }</span>
        </div>
    )
}