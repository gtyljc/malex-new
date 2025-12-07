
"use client";

// tools
import { useState, createContext } from "react";

export const ViewerCtx = createContext();

export function ViewerProvider({ children }){
    
    // open / close
    const [ isOpened, changeState ] = useState(false);
    const openViewer = () => changeState(true);
    const closeViewer = () => changeState(false);

    // scroll
    const [ index, setIndex ] = useState(0);
    const sclForward = () => setIndex(i => i + 1);
    const sclBack = () => setIndex(i => i - 1);

    return (
        <ViewerCtx.Provider
            value={
                {   
                    // open/close
                    isOpened,
                    openViewer,
                    closeViewer,

                    // scroll
                    index,
                    setIndex,
                    sclBack, 
                    sclForward
                } 
            }
        >
            { children }
        </ViewerCtx.Provider>
    )
}