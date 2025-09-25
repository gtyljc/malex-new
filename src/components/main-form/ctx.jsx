"use client";

// tools
import { useState, createContext } from "react";

// this context will contain state is form opened (true) or not (false)
export const MainFormCtx = createContext();

export function MainFormProvider({children}){
    const [isOpened, changeState] = useState(false);
    const openForm = () => isOpened ? changeState(false);

    return (
        <MainFormCtx value={{isOpened, changeState}}>
            {children}
        </MainFormCtx>
    )
}