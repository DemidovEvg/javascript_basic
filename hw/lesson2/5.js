// 5. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
// где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от
// переданного значения операции (использовать switch) выполнить одну из арифметических операций
// (использовать функции из задания 4) и вернуть полученное значение.

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

function mathOperation(arg1, arg2, operation) {
    if (operation === '+') {
        return sum(arg1, arg2);
    } else if (operation === '-') {
        return subtraction(arg1, arg2);
    } else if (operation === '*') {
        return multiplication(arg1, arg2);
    } else if (operation === '/') {
        return division(arg1, arg2);
    } else {
        throw Error('Неизвестная операция');
    }

}

alert(`mathOperation(100, 10, '-') = ${mathOperation(100, 10, '-')}`);
