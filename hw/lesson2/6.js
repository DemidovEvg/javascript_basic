// 6**. (Это задание не является частью курса, можете его не делать, оно для тех кому мало
//     обычных заданий, требует времени и возможно гугления, делайте по желанию.) 
//     Программа должна спросить у пользователя число, это будет количество денег, которое  
//     он хочет положить на счет в банке. Затем программа должна выдать примерно такое сообщение:  
//     "Ваша сумма в 101 рубль успешно зачислена." - в случае если пользователь ввел 101.
//     "Ваша сумма в 10020 рублей успешно зачислена." - в случае если пользователь ввел 10020.
//     "Ваша сумма в 120104 рубля успешно зачислена." - в случае если пользователь ввел 120104.
//     То есть ваша задача выводить слово «рубль» в правильном падеже, в зависимости от введенного числа.  
//     Подсказки, что я использовал (ваш подход может отличаться):   
//     1) В javascript нет функции, которая возвращает последнюю цифру, но зато мы можем получить   
//     последний символ из строки достаточно просто.   
//     2) Я использовал String() для приведения к строке   
//     https://codepen.io/IgorKubikov/pen/qQmoJJ?editors=0011   
//     3) Узнать длину строки https://codepen.io/IgorKubikov/pen/vQmRbq?editors=0011  
//     Подробнее можно почитать здесь   
//     https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length  
//     4) Чтобы получить конкретный символ в строке я использовал это  
//     https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/charAt  
//     5) Я также использовал switch, а конкретно нам нужно будет одно действие  
//     для нескольких case (т.е. если у нас 500 рублей, 47 рублей, 99 рублей и 
//     т.д. – у нас для нескольких цифр на конце одно слово «рублей»).   
//     Это можно посмотреть здесь:   
//     https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/switch#Methods_for_Multi-criteria_Case

/**
 * Fucntion ask enter number and if number valid return it
 * @param args object with parameters
 * @returns args.message The message to enter a number
 * @returns args.errorIfCance The flag need or not throw error if enter cancel button
 */

function getNumber({message, errorIfCancel = false}) {
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

let sum = getNumber({message: 'Введите сумму чтобы положить в банк', 
                    errorIfCancel: true});
let currency = null;
let REcurrencyTemplates = new Map();
// Число должно оканчиваться на 1 и перед ним не 1
REcurrencyTemplates['рубль'] = (/\d*([^1]|\b)1$/);
// Число должно оканчиваться на 2,3,4 и перед ним не 1
REcurrencyTemplates['рубля'] = (/\d*([^1]|\b)[2-4]$/);

if (REcurrencyTemplates['рубль'].test(sum)) {
    currency = 'рубль';
} else if (REcurrencyTemplates['рубля'].test(sum)) {
    currency = 'рубля';
} else {
    currency = 'рублей';
}

alert(`Ваша сумма в ${sum} ${currency} успешно зачислена.`);

