
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import objectSupport from "dayjs/plugin/objectSupport";
import customParseFormat from "dayjs/plugin/customParseFormat";

// others
import dayjs from "dayjs";

// set up dayjs
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);

export { dayjs };