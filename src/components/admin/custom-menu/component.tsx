
// others
import { SiteConfigQueries } from '@src/lib/apollo-clients/queries/admin';

// components
import { Menu } from 'react-admin';

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
                to={ `/${ SiteConfigQueries.resourceName }` } 
                primaryText="Site Config"
                leftIcon={ <AdminPanelSettingsSharpIcon /> } 
            />
        </Menu>
    )
}