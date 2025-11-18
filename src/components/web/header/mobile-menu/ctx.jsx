
// others
import { createContext, useState } from "react";

export const MobileMenuCtx = createContext();

export function MobileMenuProvider({ children }){
    const [isOpened, changeState] = useState(false);

    const openMenu = () => changeState(true);
    const closeMenu = () => changeState(false);
    const toggleMenu = () => changeState(p => !p);

    return (
        <MobileMenuCtx.Provider
            value={ { isOpened, openMenu, closeMenu, toggleMenu } }
        >
            { children }
        </MobileMenuCtx.Provider>
    )
};