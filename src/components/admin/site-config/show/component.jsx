
// others
import { SiteConfigQueries } from "@lib/apollo-clients/queries/backend";

// componenents
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    TopToolbar,
    EditButton,
    EmailField
} from "react-admin";

function Actions (){
    return (
        <TopToolbar>
            <EditButton resource={ SiteConfigQueries.resource } />
        </TopToolbar>
    )
}

function CustomTimeField({ source, label }){
    return (
        <DateField 
            source={ source }
            showTime
            showDate = { false } 
            label={ label }
            options={ { timeStyle: "short" } }
        />
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
                <CustomTimeField source="opening_at" label="Company opens at" />
                <CustomTimeField source="closing_at" label="Company closes at" />
                <TextField 
                    source="min_duration"
                    label="Min duration of appointment" 
                />
                <EmailField source="support_email" />
                <TextField source="phone_number" />
            </SimpleShowLayout>
        </Show>
    )
}