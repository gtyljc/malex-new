
import { 
    List, 
    DataTable, 
    SearchInput,
    EditButton
} from "react-admin";


export default function AppointmentList(){
    const listFilters = [
        <SearchInput source="name" alwaysOn/>
    ]
    
    return (
        <List filters={listFilters}>
            <DataTable>
                <DataTable.NumberCol source="id" />
                <DataTable.Col source="name" />
                <DataTable.Col source="surname" />
                <DataTable.Col source="address" />
                <DataTable.Col source="job_desc" />
                <DataTable.Col source="bwt" />
                <DataTable.Col source="number" />
                <DataTable.Col>
                    <EditButton/>
                </DataTable.Col>
            </DataTable>
        </List>
    )
}