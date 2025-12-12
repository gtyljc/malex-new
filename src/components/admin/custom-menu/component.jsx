
import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import { SiteConfigQueries } from '@src/apollo-clients/requests/back-requests';

export default function CustomMenu(){
    return (
        <Menu>
            <Menu.ResourceItem name="appointment" />
            <Menu.ResourceItem name="work" />
            <Menu.Item 
                to={ `/${SiteConfigQueries.resource}` } 
                primaryText="Site Config"
                leftIcon={ <LabelIcon /> } 
            />
        </Menu>
    )
}