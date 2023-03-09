/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathArr = path.split('.');

    return obj =>{
        let result = obj;

        for (const item of pathArr){
            if (result === undefined) return;
            result = result[item];    
        }
        return result;    
    };
};