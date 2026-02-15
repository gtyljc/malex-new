
import { decodeJwt } from "jose";
import { dayjs } from "@lib/dayjs";

// makes first letter capital
export function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// removes element and returns new array
export function patch(array, ...args){
    return array.filter(e => !args.includes(e));
}

// all to lower case and capitalize first letter
export function normalizeString(string){
    return capitalize(string.toLowerCase())
}

// stops function on delay, which was in ms specified
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// checks if jwt expired ( JWT must contain "exp" claim )
export function isJWTExpired(jwt){
    return decodeJwt(jwt)["exp"] < dayjs().unix();
}

// sets to 0 all time units after day ( hour, minute, seconds, miliseconds )
export function resetAfterDay(date){
    return date.hour(0).minute(0).second(0).millisecond(0)
}

// returns start and end points of time range in one day
export function inRangeOfOneDay(date){
    return [ resetAfterDay(date), resetAfterDay(date.add(1, "day")) ]
}