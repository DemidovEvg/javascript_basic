/*1. Задать температуру в градусах по Цельсию. Вывести в alert соответствующую 
температуру в градусах по Фаренгейту. Подсказка: расчёт идёт по формуле: 
Tf = (9 / 5) * Tc + 32, где Tf – температура по Фаренгейту, 
Tc – температура по Цельсию
 */

`use strict`;
function getNumber(message) {
    let number = null;
    while (!number || number === null || isNaN(Number(number))) {
        number = prompt(message);
    }
    return Number(number);
}

let temperatureCelsius = getNumber('Please enter temperature in celsius:');

let temperatureFahrenheit = (9/5) * temperatureCelsius + 32;

alert(`The result of the conversion is ${temperatureFahrenheit} ℉`);