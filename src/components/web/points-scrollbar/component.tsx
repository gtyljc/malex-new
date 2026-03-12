"use client"

// others
import { useContext, useMemo } from "react";
import { PointsScrollbarCtx } from "./ctx";
import clsx from "clsx";

// css
import styles from "./styles.module.css";

interface PointsParams {
    pointsNum: number
}

function Points({ pointsNum }: PointsParams){
    const arr = [];
    
    for(let i = 0; i < pointsNum; i++){
        arr.push(
            <Point pIndex={ i } key={ i }/>
        );
    }

    return arr;
}

interface PointParams {
    pIndex: number
}

function Point({ pIndex }: PointParams){
    const { index, setIndex } = useContext(PointsScrollbarCtx);

    return(
        <button
            className={
                clsx(
                    styles.point,
                    index == pIndex && "after:transform-[scale(1)]!"
                )
            }
            onClick={ () => setIndex(pIndex) }
        >
        </button>
    )
}

interface PointsScrollbarParams {
    pointsNum: number
}

// must be wrapped in PointsScrollbarProvider
export default function PointsScrollbar({ pointsNum }: PointsScrollbarParams){
    const points = useMemo((): React.ReactNode => <Points pointsNum={ pointsNum } />, [ pointsNum ]);
    
    return (
        <div className="flex flex-row gap-5">
            { points }
        </div>
    )
}