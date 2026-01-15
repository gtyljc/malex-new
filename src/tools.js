
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