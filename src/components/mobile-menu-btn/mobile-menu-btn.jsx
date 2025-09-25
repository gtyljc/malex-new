"use client";

// tools
import Image from "next/image";

// images
import mobile_svg from "./mobile.svg";


export default function MobileMenuBtn(){
    const [menuState, changeMenuState] = useState(false); // true => opened / false => closed

    function handleMobileMenuBtnClick() {
        if (menuState){
            changeMenuState(false);
        }
        else {
            changeMenuState(true);
        }
    }

    return (
        <button 
            className={styles.btn}
            onClick={handleMobileMenuBtnClick}
        >
            <Image 
                width={28}
                height={28}
                src={mobile_svg} 
                alt="Navigation menu" 
            />
        </button>
    )
}