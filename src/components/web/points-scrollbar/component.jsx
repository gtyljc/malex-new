"use client"

// tools
import { useContext, useMemo } from "react";
import { PointsScrollbarCurrentIndexCtx } from "./ctx";

// assets
import styles from "./styles.module.css";
import clsx from "clsx";


function generatePoints(p_num){
    const arr = [];
    
    for(let i = 0; i < p_num; i++){
        arr.push(
            <Point i={i} key={i}/>
        );
    }

    return arr;
}

function Point({ i }){
    const { index, setIndex } = useContext(PointsScrollbarCurrentIndexCtx);

    return(
        <button
            className={
                clsx(
                    index == i && styles.point_active,
                    styles.point
                )
            }
            onClick={() => setIndex(i)}
        >
        </button>
    )
}

// must be wrapped in PointsScrollbarProviders
export default function PoinsScrollbar({ p_num }){
    const points = useMemo(() => generatePoints(p_num));
    
    return (
        <div className={styles.bar}>
            {points}
        </div>
    )
}