/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */

export const omit = (obj, ...fields) => {
    let result = {};
    let sol = Object.entries(obj);
    for (const [key, value] of sol){
        if (fields.includes(key) === false){
        result[key] = value;        
        }
    }
    return result
};
