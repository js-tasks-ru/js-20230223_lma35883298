/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */

export function uniq(arr) {
<<<<<<< HEAD
    let result = [];
=======
    const result = [];
>>>>>>> e2c2a7d7dcaee5d93a4d8eda84ec56e67972df1f
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
