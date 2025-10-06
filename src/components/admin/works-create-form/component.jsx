
import { 
    DateInput,
    ImageInput,
    ImageField,
    SelectInput,
    SimpleForm
} from "react-admin";
import { required } from "react-admin";
import dayjs from "dayjs";

export default function WorksCreateForm() {
    return (
        <SimpleForm>
            <ImageInput source={process.env.NEXT_PUBLIC_IMAGE_KEYWORD} validate={required()} >
                <ImageField source="src"/>
            </ImageInput>
            <SelectInput 
                source="category"
                validate={required()}
                optionValue="value"
                optionText="label"
                choices={
                    [
                        {value: "PLUMBING", label: "Plumbing"},
                        {value: "ASSEMBLING", label: "Assembling"},
                        {value: "MOUNTING", label: "Mounting"}
                    ]
                }
            />
            <DateInput 
                validate={required()}
                source="timestamp" 
                parse={ date => {return dayjs(date).toISOString()} } // convert date to ISO-8601 format
            />
        </SimpleForm>
    )
}