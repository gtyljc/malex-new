
import { Edit, SimpleForm, TextInput } from "react-admin"

export default function AppointmentEdit() {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="duration" />
            </SimpleForm>
        </Edit>
    )
}