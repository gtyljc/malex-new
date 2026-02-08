
// others
import { useState, createContext } from "react";

export const HeaderCtx = createContext();

export function HeaderProvider({ children }){
    const [ currentPage, setCurrentPage ] = useState("Home"); // as default index page

    return (
        <HeaderCtx.Provider
            value={{ setCurrentPage, currentPage }}
        >
            { children }
        </HeaderCtx.Provider>
    )
}