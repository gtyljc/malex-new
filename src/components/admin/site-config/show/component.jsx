
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    TopToolbar,
    EditButton,
    EmailField
} from "react-admin";
import { SiteConfigQueries } from "@src/apollo-clients/requests/back-requests";

function Actions (){
    return (
        <TopToolbar>
            <EditButton resource={ SiteConfigQueries.resource } />
        </TopToolbar>
    )
}

export default function SiteConfigShow(){
    return (
        <Show 
            id={ 1 } 
            resource={ SiteConfigQueries.resource }
            title="Site Config"
            actions={ <Actions /> }
        > 
            <SimpleShowLayout>
                <DateField 
                    source="opening_at" 
                    showTime  
                    showDate = { false } 
                    label="Company opens at"
                />
                <DateField 
                    source="closing_at" 
                    showTime 
                    showDate = { false } 
                    label="Company closes at"
                />
                <TextField 
                    source="min_duration" 
                    label="Minimum time on one appointment ( in hours )" 
                />
                <EmailField source="support_email" />
            </SimpleShowLayout>
        </Show>
    )
}