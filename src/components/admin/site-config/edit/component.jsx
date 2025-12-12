
import {
    Edit,
    SimpleForm,
    TimeInput,
    SelectInput,
    Toolbar,
    SaveButton,
    TextInput
} from "react-admin";
import { required } from "react-admin";

function CustomToolbar(){
    return (
        <Toolbar>
            <SaveButton />
        </Toolbar>
    )
}

export default function SiteConfigEdit(){
    return (
        <Edit 
            title="Admin Config"
            redirect="show"
        >
            <SimpleForm toolbar={ <CustomToolbar /> }>
                <TimeInput 
                    source="opening_at" 
                    label="Company opens at" 
                    validate={ required() }
                />
                <TimeInput 
                    source="closing_at" 
                    label="Company closes at" 
                    validate={ required() }
                />
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
                <TextInput source="support_email" />
            </SimpleForm>
        </Edit>
    )
}