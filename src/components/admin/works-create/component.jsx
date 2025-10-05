
import { 
    Create,
    DateInput,
    ImageInput,
    ImageField,
    SelectInput,
    SimpleForm
} from "react-admin";
import dayjs from "dayjs";


export default function WorksCreate(){
    return (
        <Create>
            <SimpleForm>
                <ImageInput source={process.env.NEXT_PUBLIC_IMAGE_KEYWORD} />
                <ImageField source=""/> 
                <SelectInput 
                    source="category"
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
                    source="timestamp" 
                    parse={ date => {return dayjs(date).toISOString()} } // convert date to ISO-8601 format
                />
            </SimpleForm>
        </Create>
    )
}