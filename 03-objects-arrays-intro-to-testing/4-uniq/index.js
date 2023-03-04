/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */

export function uniq(arr) {
    let result = [];
    if (arr === [] || arr === undefined){
        return result
    };
    arr.forEach(element => {
        if (!result.includes(element)){
            result.push(element);
        }
    });
    return result
}
