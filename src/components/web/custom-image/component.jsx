
// others
import Image from "next/image";
import { useState, useMemo } from "react";

// components
import LoadingIcon from "@web/loading-icon/component";

export default function CustomImage({ props }){
    const [ isLoaded, setStatus ] = useState(false);
    const img = useMemo(() => <Image { ...props } onLoadingComplete={ () => { setStatus(true) } }  />)
    
    return ( isLoaded ? img: <div className="h-full"><LoadingIcon /></div> );
}