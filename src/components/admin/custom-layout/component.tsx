
import { Layout } from "react-admin";
import CustomMenu from "@admin/custom-menu/component"

export default function CustomLayout({ children }){
    return (
        <Layout menu={ CustomMenu } >
            { children }
        </Layout>
    )
}
