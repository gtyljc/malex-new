
// components
import { Create } from "react-admin"
import WorkForm from "../form/component"

export default function WorkCreate(){
    return (
        <Create redirect="list">
            <WorkForm />
        </Create>
    )
}