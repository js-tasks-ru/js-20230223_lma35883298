/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */

const fruits = {
    apple: 2,
    orange: 4,
    banana: 3
   };
const pick = (obj, ...fields) => {
    let result = {};
    Object.entries(obj)
};

console.log(pick(fruits, 'apple', 'banana'));
