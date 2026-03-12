
// components
import { 
    List,
    DataTable,
    ImageField,
    DateField
} from "react-admin"

export default function WorkList(){
    return (
        <List>
            <DataTable>
                <DataTable.Col source="id"/>
                <DataTable.Col source="category"/>
                <DataTable.Col label="Image">
                    <ImageField source="img_url" />
                </DataTable.Col>
                <DataTable.Col label="Added at">
                    <DateField source="timestamp"/>
                </DataTable.Col>
            </DataTable>
        </List>
    )
}