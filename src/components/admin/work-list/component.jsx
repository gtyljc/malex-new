
// components
import { 
    List,
    DataTable,
    ImageField,
    DateField,
    EditButton,
    DeleteButton
} from "react-admin"

export default function WorkList(){
    return (
        <List>
            <DataTable>
                <DataTable.Col source="id"/>
                <DataTable.Col source="category"/>
                <DataTable.Col source="Photo">
                    <ImageField source="img_url" />
                </DataTable.Col>
                <DataTable.Col>
                    <DateField source="timestamp"/>
                </DataTable.Col>
                <DataTable.Col>
                    <EditButton/>
                </DataTable.Col>
                <DataTable.Col>
                    <DeleteButton/>
                </DataTable.Col>
            </DataTable>
        </List>
    )
}