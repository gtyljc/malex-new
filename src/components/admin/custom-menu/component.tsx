
// components
import { Menu } from 'react-admin';
import * as types from "@lib/types";

// icons
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import PhotoSharpIcon from '@mui/icons-material/PhotoSharp';

export default function CustomMenu(){
    return (
        <Menu>
            <Menu.ResourceItem name="appointment" leftIcon={ <AssignmentSharpIcon /> } />
            <Menu.ResourceItem name="work" leftIcon={ <PhotoSharpIcon /> } />
            <Menu.Item
                to={ `/${ types.ResourceEnum.SiteConfig }` } 
                primaryText="Site Config"
                leftIcon={ <AdminPanelSettingsSharpIcon /> } 
            />
        </Menu>
    )
}