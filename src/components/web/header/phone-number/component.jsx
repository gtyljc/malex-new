
import { useQuery } from "@apollo/client/react";
import { SiteConfigQueries } from "@src/apollo-clients/requests/frontend";

export default function PhoneNumber(){
    const { data, loading } = useQuery(SiteConfigQueries.contactData());
    const phoneNumber = !loading ? data.contactData.data[0].phone_number: null;

    return (
        <a className="font-semibold text-lg" href={ `tel:${phoneNumber}` }>
            { phoneNumber }
        </a>
    )
}