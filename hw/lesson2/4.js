// 4. Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с
// двумя параметрами. Т.е. например, функция для сложения должна принимать два числа,
// складывать их и возвращать результат. Обязательно использовать оператор return.

function sum(number1, number2) {
    return number1 + number2;
}

function subtraction(number1, number2) {
    return number1 - number2;
}

function multiplication(number1, number2) {
    return number1 * number2;
}

function division(number1, number2) {
    return number1 / number2;
}

alert(`sum(100, 10) = ${sum(100, 10)}`);
alert(`subtraction(100, 10) = ${subtraction(100, 10)}`);
alert(`multiplication(100, 10) = ${multiplication(100, 10)}`);
alert(`division(100, 10) = ${division(100, 10)}`);