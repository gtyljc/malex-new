
"use client";

// tools
import { useState, createContext } from "react";

interface ViewerCtx {
    isOpened: boolean | undefined,
    openViewer: () => void | undefined,
    closeViewer: () => void | undefined,
    index: number | undefined,
    setIndex: (value: number) => void | undefined,
    sclBack: () => void | undefined,
    sclForward: () => void | undefined
}

export const ViewerCtx = createContext<ViewerCtx>(
    {
        isOpened: undefined,
        openViewer: undefined,
        closeViewer: undefined,
        index: undefined,
        setIndex: undefined,
        sclBack: undefined, 
        sclForward: undefined
    }
);

export function ViewerProvider({ children }){
    
    // open / close
    const [ isOpened, changeState ] = useState<boolean>(false);
    const openViewer = () => changeState(true);
    const closeViewer = () => changeState(false);

    // scroll
    const [ index, setIndex ] = useState<number>(0);
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