
// others
import { createContext, useState } from "react";

interface MobileMenuCtx {
    isOpened: boolean | undefined,
    openMenu: () => void | undefined,
    toggleMenu: () => void | undefined,
    closeMenu: () => void | undefined,
}

export const MobileMenuCtx = createContext<MobileMenuCtx>(
    {
        isOpened: undefined,
        openMenu: undefined,
        toggleMenu: undefined,
        closeMenu: undefined
    }
);

export function MobileMenuProvider({ children }){
    const [isOpened, changeState] = useState<boolean>(false);

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