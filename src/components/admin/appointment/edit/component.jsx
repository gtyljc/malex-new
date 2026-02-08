
// others
import dayjs from "dayjs";
import { required } from "react-admin";
import { useGetOne } from "react-admin";
import { SiteConfigQueries } from "@src/apollo-clients/queries/backend";

// components
import { Edit, SimpleForm, SelectInput, BooleanInput } from "react-admin";

export default function AppointmentEdit() {
    const { data, isPending } = useGetOne(SiteConfigQueries.resource, { id: "1" });

    // wait until data will be loaded
    if (isPending) { return <p>Loading...</p> };

    // generating choices
    const choices = [];
    const opensAt = dayjs(data["opening_at"]).unix();
    const closesAt = dayjs(data["closing_at"]).unix();
    const timeStep = data["min_duration"] * 60 * 60; // from hours to seconds
    let cName = 0;

    for (let timeOffset = opensAt; timeOffset < closesAt - timeStep; timeOffset += timeStep){
        cName += data["min_duration"];
        
        choices.push(
            { 
                id: cName, 
                name: cName.toString() + " Hours"
            }
        )
    }

    return (
        <Edit>
            <SimpleForm>
                <SelectInput 
                    validate={ required() }
                    source="duration" 
                    choices={ choices } 
                />
                <BooleanInput source="completed" validate={ required() } />
            </SimpleForm>
        </Edit>
    )
}