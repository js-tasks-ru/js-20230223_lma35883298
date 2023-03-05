/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    const arr = Array.from(string);
    let counter = 1;
    let result = [];

    if (size === 0){
        return result.join();
    };
    if (size === undefined){
        return string;
    };

    for (let i = 0; arr.length > i; i++){
        if(arr[i] === arr[i+1]){
            counter++
                if (counter <= size){
                    result.push(arr[i]);
                }   
        } else {
            result.push(arr[i]);
            counter = 1;    
        } 
    }
    return result.join("");
}
