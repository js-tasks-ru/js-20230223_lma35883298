# trimSymbols

Необходимо реализовать функцию "trimSymbols". Функция принимает 2 аргумента:
  1. Строку произвольной длинны  
  2. Число разрешенных одинаковых символов которые расположены в строке подряд  

Функция должна вернуть строку символов, удалив из нее все последовательные одинаковые 
символы которые превышают заданное число.

  × should remove an identical consecutive characters that exceed the specified size (6ms)
    √ should return empty string if it was passed to function like an argument
    × should return empty string if "size" equal 0 (1ms)
    × should return the same string if "size" parameter wasn't specified (1ms)


**Внимание:** В решении НЕ должны использоваться регулярные выражения. 

**Пример:**

```javascript
trimSymbols('xxx', 3); // 'xxx' - ничего не удалили т.к разрешено 3 символа подряд
trimSymbols('xxx', 2); // 'xx' - удалили один символ
trimSymbols('xxx', 1); // 'x'

trimSymbols('xxxaaaaa', 2); // 'xxaa'
trimSymbols('xxxaaaaab', 3); // 'xxxaaab'
