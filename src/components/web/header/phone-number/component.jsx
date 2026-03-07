
// others
import { frontendClient } from "@src/lib/apollo-clients/frontend";
import Image from "next/image";

// images
import phone from "./phone.svg";

export default function PhoneNumber(){
    const { siteConfig } = frontendClient;

    return (
        <div className="flex flex-row items-center gap-3">
            <Image
                width={ 30 }
                src={ phone }
                alt="Malex contact phone number"
            />
            <a className="font-semibold text-lg" href={ `tel:${ siteConfig.phone_number }` }>
                { siteConfig.phone_number }
            </a>
        </div>
    )
}