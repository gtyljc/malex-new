
// components
import { 
    List, 
    DataTable, 
    SearchInput,
    DateField,
    BooleanField
} from "react-admin";

export default function AppointmentList(){
    const listFilters = [
        <SearchInput source="name" alwaysOn/>
    ]
    
    return (
        <List filters={ listFilters }>
            <DataTable>
                <DataTable.NumberCol source="id" />
                <DataTable.Col source="name" />
                <DataTable.Col source="surname" />
                <DataTable.Col source="address" />
                <DataTable.Col source="job_desc" />
                <DataTable.Col source="bwt" label="Best way to touch" />
                <DataTable.Col source="number" />
                <DataTable.Col label="Date of meeting">
                    <DateField source="date" showDate showTime />
                </DataTable.Col>
                <DataTable.Col source="duration" />
                <DataTable.Col label="Completed" sortByOrder="ASC" >
                    <BooleanField source="completed" sortByOrder="ASC" />
                </DataTable.Col>
            </DataTable>
        </List>
    )
}