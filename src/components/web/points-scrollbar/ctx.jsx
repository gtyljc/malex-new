"use client";

// others
import { createContext, useState } from "react";

export const PointsScrollbarCtx = createContext(); 

export function PointsScrollbarProvider({ children }){
    const [ index, setIndex ] = useState(0);
    
    return (
        <PointsScrollbarCtx.Provider value={ { index, setIndex } }>
            { children }
        </PointsScrollbarCtx.Provider>
    );
}