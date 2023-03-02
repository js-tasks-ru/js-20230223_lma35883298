/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
// 
export function sortStrings(arr, param = 'asc') {
    let clone = arr.slice();
    return clone.sort((a, b) => {
      if (param === 'asc') {
        return a.localeCompare(b, ["en", "ru"], {caseFirst: 'upper'});
      } else if (param === 'desc') {
        return b.localeCompare(a, ["en", "ru"], {caseFirst: 'upper'});
      }
    })
    }
//     console.log(`Новый массив ${clone}`)
//     return clone;    
// }

// console.log(`Было: ['b', 'c', 'a']`)
// sortStrings(['b', 'c', 'a'])

// console.log(`Было: ['абрикос', 'яблоко', 'ёжик']`)
// sortStrings(['абрикос', 'яблоко', 'ёжик', 'book'])

// console.log(`Было: ['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик']`)
// sortStrings(['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик'])

// console.log(`Было: ['apple', 'Apple', 'banana', 'Banana', 'orange', 'Orange']`)
// sortStrings(['apple', 'Apple', 'banana', 'Banana', 'orange', 'Orange'])

// console.log(`Было: ['Соска (пустышка) NUK 10729357','ТВ тюнер D-COLOR  DC1301HD','Детский велосипед Lexus Trike Racer Trike','Соска (пустышка) Philips SCF182/12','Powerbank аккумулятор Hiper SP20000'
//   ]`)
// sortStrings([
//     'Соска (пустышка) NUK 10729357',
//     'ТВ тюнер D-COLOR  DC1301HD',
//     'Детский велосипед Lexus Trike Racer Trike',
//     'Соска (пустышка) Philips SCF182/12',
//     'Powerbank аккумулятор Hiper SP20000'
//   ])

//   console.log(`Было: [
//     'Детский велосипед Lexus Trike Racer Trike','Соска (пустышка) NUK 10729357','Соска (пустышка) Philips SCF182/12','ТВ тюнер D-COLOR  DC1301HD','Powerbank аккумулятор Hiper SP20000'
//   ]`)
// sortStrings([
//     'Детский велосипед Lexus Trike Racer Trike',
//     'Соска (пустышка) NUK 10729357',
//     'Соска (пустышка) Philips SCF182/12',
//     'ТВ тюнер D-COLOR  DC1301HD',
//     'Powerbank аккумулятор Hiper SP20000'
//   ])
