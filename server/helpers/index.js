function hasDefinedProperties(obj, properties) {
    for (var p=0; p < properties.length; p++) {
        if (!obj.hasOwnProperty(properties[p]) || obj[properties[p]] === undefined
            || obj[properties[p]] === '' || obj[properties[p]] === null) {
            console.log(properties[p] + ' not found!');
            return false;
        }
    }
    return true;
}

function sortbyDateDescending(a, b) {
    if (a.date === b.date) {
        return 0;
    }
    else {
        return a.date < b.date ? 1 : -1;
    }
}

module.exports = {
    hasDefinedProperties,
    sortbyDateDescending
};