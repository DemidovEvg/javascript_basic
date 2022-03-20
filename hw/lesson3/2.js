// 2. С этого урока начинаем работать с функционалом интернет-магазина. 
// Предположим, есть сущность корзины. 
// Нужно реализовать функционал подсчета стоимости корзины 
// в зависимости от находящихся в ней товаров. 
// Товары в корзине хранятся в массиве. Задачи:
// a) Организовать такой массив для хранения товаров в корзине;
// b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

let products = [
    //name, number, unit ,price
    ['apple', 10, 'kilogram', 143],
    ['chair', 7, 'piece', 1500],
    ['pen', 75, 'piece', 35],
];

function countBasketPrice(products) {
    let basketPrice = 0;
    for (let product of products) {
        let name = null;
        let number = null;
        let unit = null;
        let price = null;
        [name, number, unit, price] = product;
        basketPrice += number * price;
    }
    return basketPrice;
}

alert(`Total basket cost is equal ${countBasketPrice(products)}`);

