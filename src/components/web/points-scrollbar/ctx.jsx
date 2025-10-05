
// tools
import { createContext, useState } from "react";

export const PointsScrollbarCurrentIndexCtx = createContext(); 

export function PointsScrollbarProviders({ children }){
    const [index, setIndex] = useState(0);
    
    return (
        <PointsScrollbarCurrentIndexCtx value={{index, setIndex}}>
            {children}
        </PointsScrollbarCurrentIndexCtx>
    );
}