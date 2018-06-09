const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const lorem2 = lorem.substring(27, 115);
const lorem3 = lorem.substring(10, 140) + lorem.substring(0);

/* gets an object's nested property value using dot notation obj[a.x.y] */
function getPropertyByDotNotation(obj, path) {
    if (!path)
        return obj;

    var prop, props = path.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}

/* removes undefined and introduced properties */
function mergeAllowed(state, newState) {
    const allowedProperties = Object.keys(state);
    return Object.keys(newState)
            .filter(key => allowedProperties.includes(key))
            .reduce((obj, key) => ({
                ...obj, ...(newState[key] !== undefined && {[key]: newState[key]})
            }), state);
}

const sortByDateDescending = (a, b) => {
    if (a.date === b.date) {
        return 0;
    }
    return a.date < b.date ? 1 : -1;
}

export {lorem, lorem2, lorem3, mergeAllowed, getPropertyByDotNotation, sortByDateDescending};