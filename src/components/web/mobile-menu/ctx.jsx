
// tools
import { createContext, useState } from "react";


// this context will contain state of menu opened (true) or not (false)
export const MobileMenuCtx = createContext();

export function MobileMenuProvider({children}){
    const [isOpened, changeState] = useState(false);
    const openMenu = () => changeState(true);
    const closeMenu = () => changeState(false);
    const toggleMenu = () => changeState(p => !p);

    return (
        <MobileMenuCtx 
            value={
                {isOpened, openMenu, closeMenu, toggleMenu}
            }
        >
            {children}
        </MobileMenuCtx>
    )
};