
// if you want to use dayjs inside this project you must to
// import it from this file instead of importing it direct;

// plugins
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import objectSupport from "dayjs/plugin/objectSupport";
import customParseFormat from "dayjs/plugin/customParseFormat";

// others
import { SiteConfigQueries } from "./apollo-clients/queries/frontend";
import dayjs from "dayjs";
import BaseApolloClient from "./apollo-clients/base";

// set up dayjs
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);

// get and set timezone
const { data } = await new BaseApolloClient().client.query({ query: SiteConfigQueries.publicConfig() });

dayjs.tz.setDefault(data.publicConfig.data[0].timezone);

export { dayjs };