
// components
import { Edit } from "react-admin";
import WorkForm from "../form/component";

export default function WorkEdit(){
    return (
        <Edit redirect="list">
            <WorkForm />
        </Edit>
    )
}