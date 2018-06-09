function hasDefinedProperties(obj, properties) {
    for (var p=0; p < properties.length; p++) {
        if (!obj.hasOwnProperty(properties[p]) || obj[properties[p]] === undefined
            || obj[properties[p]] === '' || obj[properties[p]] === null) {
            return false;
        }
    }
    return true;
}

function sortByDateDescending(a, b) {
    if (a.date === b.date) {
        return 0;
    }
    return a.date < b.date ? 1 : -1;
}
function sortByDateAscending(a, b) {
    if (a.date === b.date) {
        return 0;
    }
    return a.date < b.date ? -1 : 1;
}

module.exports = {
    hasDefinedProperties,
    sortByDateDescending,
    sortByDateAscending
};