
// others
import * as types from "@lib/types";

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
            <EditButton resource={ types.ResourceEnum.SiteConfig } />
        </TopToolbar>
    )
}

interface CustomTimeFieldParams {
    source: string;
    label: string;
}

function CustomTimeField({ source, label }: CustomTimeFieldParams){
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
            resource={ types.ResourceEnum.SiteConfig }
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