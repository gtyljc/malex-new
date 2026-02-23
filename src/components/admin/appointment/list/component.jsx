
// others
import { useRecordContext } from "react-admin";
import { styled } from '@mui/styles';
import { parsePhoneNumber } from "libphonenumber-js/min";

// components
import { 
    List, 
    DataTable, 
    SearchInput,
    DateField,
    BooleanField
} from "react-admin";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';

const LinkToApp = styled("a")(
    { 
        "& svg": { pointerEvents: "none" }, 
        width: "100%", 
        height: "100%",
        display: "block"
    }
);

function PhoneNumberField(){
    const record = useRecordContext();

    //  wait until will be loaded
    if (!record) return null;

    const phoneNumber = parsePhoneNumber(record.phone_number, "US");

    return (
        <LinkToApp>
            { phoneNumber.formatInternational() }
        </LinkToApp>
    )
}

function BWTField(){
    const record = useRecordContext();

    //  wait until will be loaded
    if (!record) return null;

    let icon;
    let href;

    switch (record.bwt){
        case "WHATSAPP": 
            icon = <WhatsAppIcon  />
            href = `https://wa.me/${ record.phone_number }`

        case "PHONE":
            icon = <LocalPhoneIcon  />
            href = `tel:${ record.phone_number }`
    
        case "TEXT":
            icon = <MessageIcon  />
            href = `sms:${ record.phone_number }`
    }

    return (
        <LinkToApp
            href={ href }
            onClick={ (e) => e.target === e.currentTarget && e.stopPropagation() }
        >
            { icon }
        </LinkToApp>
    )
}

function DurationField(){
    const record = useRecordContext();

    //  wait until will be loaded
    if (!record) return null;

    return (
        <span>
            { record.duration <= 1 ? `${ record.duration } Hour`: `${ record.duration } Hours` }
        </span>
    )
}

function CustomTableColumn({ children, args }){
    const record = useRecordContext();
    
    return (
        <DataTable.Col
            { 
                ...{ 
                    sx: record && { 
                        backgroundColor: ( 
                            record.completed ? "rgba(57, 250, 154, 0.15)": 
                            "rgba(227, 51, 39, 0.15)"
                        )
                    },
                    ...args 
                }
            }
        >
            { children }
        </DataTable.Col>
    )
}

export default function AppointmentList(){
    const listFilters = [
        <SearchInput source="name" alwaysOn />
    ]
    
    return (
        <List filters={ listFilters } sort={ { field: "completed", order: "ASC" } }>
            <DataTable size="medium">
                <CustomTableColumn args={ { source: "id", disableSort: true } }/>
                <CustomTableColumn args={ { source: "name", disableSort: true } }/>
                <CustomTableColumn args={ { source: "surname", disableSort: true } }/>
                <CustomTableColumn args={ { source: "address", disableSort: true } }/>
                <CustomTableColumn args={ { label: "Job description", source: "job_desc", disableSort: true } }/>
                <CustomTableColumn args={ { label: "Best way to touch", source: "bwt", disableSort: true } }>
                    <BWTField />
                </CustomTableColumn>
                <CustomTableColumn args={ { source: "phone_number", disableSort: true } }>
                    <PhoneNumberField />
                </CustomTableColumn>
                <CustomTableColumn args={ { label: "Date", disableSort: true } }>
                    <DateField source="date" showDate showTime />
                </CustomTableColumn>
                <CustomTableColumn args={ { source: "duration", disableSort: true } }>
                    <DurationField />
                </CustomTableColumn>
                <CustomTableColumn args={ { source: "Completed", disableSort: true } }>
                    <BooleanField source="completed" />
                </CustomTableColumn>
            </DataTable>
        </List>
    )
}