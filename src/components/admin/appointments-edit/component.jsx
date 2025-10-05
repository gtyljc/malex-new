
import { Edit, SimpleForm, TextInput } from "react-admin"

export default function AppointmentsEdit() {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="duration" />
            </SimpleForm>
        </Edit>
    )
}