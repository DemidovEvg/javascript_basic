// 3. Объявить две переменные a и b и задать им целочисленные произвольные начальные значения.
// Затем написать скрипт, который работает по следующему принципу:
// - если a и b положительные, вывести их разность (ноль можно считать положительным числом);
// - если а и b отрицательные, вывести их произведение;
// - * (этот пункт по сложнее, делайте по желанию) если а и b разных знаков, вывести их сумму;

function getNumber(message, errorIfCancel = false) {
    let number = null;
    number = prompt(message);
    if (number === null && errorIfCancel) {
        throw new Error('Input was cancel');     
    } else if (number === null && !errorIfCancel) {
        return null;
    } else if (isNaN(Number(number))) {
        return getNumber(message);   
    }
    return Number(number);
}

let a = getNumber('Введите первое число', true);
let b = getNumber('Введите второе число', true);

if (a >= 0 && b >= 0) {
    alert(`a - b = ${a - b}`);
} else if (a < 0 && b < 0) {
    alert(`a * b = ${a * b}`);
} else {
    alert(`a + b = ${a + b}`);
}
