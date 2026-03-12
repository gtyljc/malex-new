
// others
import { required } from "react-admin";
import { dayjs } from "@lib/dayjs/client";

// components
import { 
    DateInput,
    ImageInput,
    ImageField,
    SelectInput,
    SimpleForm
} from "react-admin";

export default function WorkForm() {
    return (
        <SimpleForm>
            <ImageInput 
                source="img_url"
                validate={ required() }
                label="Image"
                accept={
                    {  
                        "image/png": [".png"],
                        "image/jpeg": [".jpg", ".jpeg"],
                        "image/webp": [".webp"],
                        "image/gif": [".gif"]
                    }
                }
                multiple={ false }
                placeholder={ <p>Put image here ( Supported types: PNG, JPG, JPEG, WEBP, GIF )</p> }
            >
                <ImageField source="src" src="img_url" />
            </ImageInput>
            <SelectInput 
                source="category"
                validate={ required() }
                optionValue="value"
                optionText="label"
                choices={
                    [
                        { value: "PLUMBING", label: "Plumbing" },
                        { value: "ASSEMBLING", label: "Assembling" },
                        { value: "MOUNTING", label: "Mounting" }
                    ]
                }
            />
            <DateInput 
                validate={ required() }
                source="timestamp" 
                parse={ date => { return dayjs(date).toISOString() } } // convert date to ISO-8601 format
            />
        </SimpleForm>
    )
}