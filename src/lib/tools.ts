
import { Dayjs } from "dayjs";

// REGEX
export const ONLY_DIGITS_REGEX = /[^\d+]/g;
export const ENG_LANGUAGE_REGEX = /^[A-Za-z]+$/;
export const EMAIL_REGEX = /^(?:\+[1-9][0-9]{7,14}|[0-9]{10})$/;
export const PHONE_NUMBER_REGEX = /^(?:\+[1-9][0-9]{7,14}|[0-9]{10})$/;

// makes first letter capital
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// removes element and returns new array
export function patch(array: Array<any>, ...args: Array<any>): Array<any> {
    return array.filter(e => !args.includes(e));
}

// all to lower case and capitalize first letter
export function normalizeString(str: string): string {
    return capitalize(str.toLowerCase())
}

// stops function on delay, which was in ms specified
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// sets to 0 all time units after day ( hour, minute, seconds, miliseconds )
export function startOfDay(date: Dayjs): Dayjs {
    return date.hour(0).minute(0).second(0).millisecond(0)
}

export function env(valueName: string): string {
    return process.env[valueName]
}