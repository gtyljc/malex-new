"use client"

// others
import { useContext, useMemo } from "react";
import { PointsScrollbarCtx } from "./ctx";
import clsx from "clsx";

// css
import styles from "./styles.module.css";

function Points({ p_num }){
    const arr = [];
    
    for(let i = 0; i < p_num; i++){
        arr.push(
            <Point i={i} key={i}/>
        );
    }

    return arr;
}

function Point({ i }){
    const { index, setIndex } = useContext(PointsScrollbarCtx);

    return(
        <button
            className={
                clsx(
                    styles.point,
                    index == i && "after:transform-[scale(1)]!"
                )
            }
            onClick={ () => setIndex(i) }
        >
        </button>
    )
}

// must be wrapped in PointsScrollbarProvider
export default function PointsScrollbar({ p_num }){
    const points = useMemo(() => <Points p_num={ p_num }/>);
    
    return (
        <div className="flex flex-row gap-5">
            { points }
        </div>
    )
}