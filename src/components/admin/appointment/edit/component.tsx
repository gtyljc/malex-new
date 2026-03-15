
// others
import { dayjs } from "@lib/dayjs/client";
import { required } from "react-admin";

// components
import { 
    Edit, 
    SimpleForm, 
    SelectInput, 
    BooleanInput,
    DateTimeInput,
    TextInput
} from "react-admin";
import { useClientAC } from "@src/lib/apollo-clients/client";

export default function AppointmentEdit() {
    const { siteConfig } = useClientAC();

    // generating choices
    const choices = [];
    const opensAt = dayjs(siteConfig.openingAt).unix();
    const closesAt = dayjs(siteConfig.closingAt).unix();
    const timeStep = siteConfig.minDuration * 60 * 60; // from hours to seconds
    let cName = 0;

    for (let timeOffset = opensAt; timeOffset < closesAt - timeStep; timeOffset += timeStep){
        cName += siteConfig.minDuration;
        
        choices.push(
            { 
                id: cName, 
                name: cName.toString() + " Hours"
            }
        )
    }

    return (
        <Edit sx={ { maxWidth: 800 } }>
            <SimpleForm>
                <TextInput source="name" disabled />
                <TextInput source="surname" disabled />
                <TextInput source="address" disabled />
                <TextInput source="job_desc" disabled />
                <TextInput source="bwt" disabled />
                <TextInput source="phone_number" disabled />
                <DateTimeInput source="date" disabled />
                <SelectInput 
                    validate={ required() }
                    source="duration" 
                    choices={ choices } 
                />
                <BooleanInput 
                    source="completed" 
                    validate={ required() } 
                />
            </SimpleForm>
        </Edit>
    )
}