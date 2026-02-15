
// others
import { useQuery } from "@apollo/client/react";
import { SiteConfigQueries } from "@lib/apollo-clients/queries/frontend";
import Image from "next/image";

// images
import phone from "./phone.svg";

export default function PhoneNumber(){
    const { data, loading } = useQuery(SiteConfigQueries.contactData());
    const phoneNumber = !loading ? data.contactData.data[0].phone_number: null;

    return (
        <div className="flex flex-row items-center gap-3">
            <Image
                width={ 30 }
                src={ phone }
                alt="Malex contact phone number"
            />
            <a className="font-semibold text-lg" href={ `tel:${ phoneNumber }` }>
                { phoneNumber }
            </a>
        </div>
    )
}