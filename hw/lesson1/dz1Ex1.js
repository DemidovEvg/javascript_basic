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