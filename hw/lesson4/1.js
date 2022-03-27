// 1. Написать функцию, преобразующую число в объект. 
// Передавая на вход число от 0 до 999, мы должны получить 
// на выходе объект, в котором в соответствующих свойствах 
// описаны единицы, десятки и сотни. Например, для числа 245 
// мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
// Если число превышает 999, необходимо выдать соответствующее сообщение 
// с помощью console.log и вернуть пустой объект.

`use strict`;
function getNumber(message) {
    let number = null;
    while (!number || number === null || isNaN(Number(number))) {
        number = prompt(message);
    }
    return Number(number);
}


let num = getNumber('Enter num from 0 to 999');

const numObj = {
    'единицы': null,
    'десятки': null,
    'сотни': null
};

for (let key in numObj) {
    numObj[key] = num % 10;
    num = Math.floor(num / 10)
}
console.log(numObj)