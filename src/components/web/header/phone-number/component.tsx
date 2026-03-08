
// others
import { clientAC } from "@src/lib/apollo-clients/client";
import Image from "next/image";

// images
import phone from "./phone.svg";

export default function PhoneNumber(){
    const { siteConfig } = clientAC;

    return (
        <div className="flex flex-row items-center gap-3">
            <Image
                width={ 30 }
                src={ phone }
                alt="Malex contact phone number"
            />
            <a className="font-semibold text-lg" href={ `tel:${ siteConfig.phoneNumber }` }>
                { siteConfig.phoneNumber }
            </a>
        </div>
    )
}