/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if (obj === undefined){
        return;
    }
    let result = {};
    let sol = Object.entries(obj);
    for (const [key, value] of sol){
        if (value === undefined){
            return result;
        }
        result[value] = key;
    };
    return result
}
