
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
        <SearchInput source="name" alwaysOn />
    ]
    
    return (
        <List filters={ listFilters } sort={ { field: "completed", order: "ASC" } }>
            <DataTable>
                <DataTable.NumberCol source="id" disableSort />
                <DataTable.Col source="name" disableSort />
                <DataTable.Col source="surname" disableSort />
                <DataTable.Col source="address" disableSort />
                <DataTable.Col source="job_desc" disableSort />
                <DataTable.Col source="bwt" label="Best way to touch" disableSort />
                <DataTable.Col source="phone_number" disableSort />
                <DataTable.Col label="Date of meeting" disableSort>
                    <DateField source="date" showDate showTime />
                </DataTable.Col>
                <DataTable.Col source="duration" disableSort/>
                <DataTable.Col label="Completed" disableSort>
                    <BooleanField source="completed" />
                </DataTable.Col>
            </DataTable>
        </List>
    )
}