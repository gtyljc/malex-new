
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
            <EditButton resource="adminConfig" />
        </TopToolbar>
    )
}

export default function AdminConfigShow(){
    return (
        <Show 
            id={ 1 } 
            resource="adminConfig" 
            title="Admin Config"
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