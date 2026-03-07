

// others
import { required, number, email } from "react-admin";
import { dayjs } from "@lib/dayjs";

// components
import {
    Edit,
    SimpleForm,
    TimeInput,
    SelectInput,
    Toolbar,
    SaveButton,
    TextInput
} from "react-admin";

function CustomToolbar(){
    return (
        <Toolbar>
            <SaveButton />
        </Toolbar>
    )
}

// adding timezone and converting time input into ISO format
function parseTime(value: string){
    return dayjs(value, "HH:mm").tz().utc().toISOString()
}

interface CustomTimeInputParams { 
    source: string;
    label: string;
}

function CustomTimeInput({ source, label }: CustomTimeInputParams){
    return (
        <TimeInput 
            source={ source }
            label={ label }
            validate={ required() }
            parse={ parseTime }
        />
    )
}

export default function SiteConfigEdit(){
    return (
        <Edit 
            title="Site Config"
            redirect="show"
            sx={{ maxWidth: 800 }}
        >
            <SimpleForm toolbar={ <CustomToolbar /> }>
                <CustomTimeInput source="opening_at" label="Opening time" />
                <CustomTimeInput source="closing_at" label="Closing time" />
                <SelectInput 
                    source="min_duration"
                    choices={
                        [
                            { id: 0.5 , name: "0.5" },
                            { id: 1 , name: "1" },
                            { id: 1.5 , name: "1.5" },
                            { id: 2 , name: "2" },
                            { id: 2.5 , name: "2.5" },
                            { id: 3 , name: "3" },
                            { id: 3.5 , name: "3.5" },
                            { id: 4 , name: "4" },
                        ]
                    }
                    validate={ required() }
                />
                <TextInput source="support_email" validate={ email() } />
                <TextInput source="phone_number" validate={ number() } />
            </SimpleForm>
        </Edit>
    )
}