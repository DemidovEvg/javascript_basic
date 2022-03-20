// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

let num = 0;
while (num < 100) {
    if (isSimple(num)) {
        console.log(num);
    }
    num += 1;
}

function isSimple(num) {
    if (num === 0 || num === 1) {
        return false;
    } else if (num === 2) {
        return true;
    } else if (num % 2 === 0) {
        return false;
    }

    for (let divider = 3; divider < Math.floor(num / 2); divider += 2) {
        if (num % divider === 0) {
            return false;
        }
    }
    return true;
}