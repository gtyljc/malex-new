
import { 
    List,
    DataTable,
    ImageField
} from "react-admin"


export default function WorksList(){
    return (
        <List>
            <DataTable>
                <DataTable.Col source="id"/>
                <DataTable.Col source="category"/>
                <DataTable.Col>
                    <ImageField source="urls" src="url" />
                </DataTable.Col>
                <DataTable.Col source="timestamp"/>
            </DataTable>
        </List>
    )
}