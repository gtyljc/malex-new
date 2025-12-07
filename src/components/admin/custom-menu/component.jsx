
import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';

export default function CustomMenu(){
    return (
        <Menu>
            <Menu.ResourceItem name="appointment" />
            <Menu.ResourceItem name="work" />
            <Menu.Item 
                to="/admin-config" 
                primaryText="Admin Config" 
                leftIcon={ <LabelIcon /> } 
            />
        </Menu>
    )
}