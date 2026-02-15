
// if you want to use dayjs inside this project you must to
// import it from this file instead of importing it direct;

// plugins
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import objectSupport from "dayjs/plugin/objectSupport";
import customParseFormat from "dayjs/plugin/customParseFormat";

// others
import { defaultApolloClient } from "./apollo-clients/base";
import dayjs from "dayjs";
import { gql } from "@apollo/client";

// set up dayjs
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);

// get timezone
const { data } = await defaultApolloClient().client.query(
    {
        query: gql`
            query GetSiteConfig($id: ID!) {
                siteConfig (id: $id){
                    code
                    success
                    message
                    data {
                        timezone
                    }
                }
            }
        `, 
        variables: { id: "1" } 
    }
)

dayjs.tz.setDefault(data.siteConfig.data[0].timezone);

export { dayjs };