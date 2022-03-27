// 2. С этого урока начинаем работать с функционалом интернет-магазина. 
// Предположим, есть сущность корзины. 
// Нужно реализовать функционал подсчета стоимости корзины 
// в зависимости от находящихся в ней товаров. 
// Товары в корзине хранятся в массиве. Задачи:
// a) Организовать такой массив для хранения товаров в корзине;
// b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
// =======================================================================

// 2.Продолжить работу с интернет-магазином:
// 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// 2.2. Реализуйте такие объекты.
// 2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
`use strict`;

const products = {
    apple: {
        number: 10,
        unit: 'kilogram',
        price: 143
    },
    chair: {
        number: 7,
        unit: 'piece',
        price: 1500
    },
    pen: {
        number: 75,
        unit: 'piece',
        price: 35
    },
};

function countBasketPrice(products) {
    let basketPrice = 0;
    for (let [productName, productData] of Object.entries(products)) {
        let { number, unit, price } = productData;
        basketPrice += number * price;
    }
    return basketPrice;
}

alert(`Total basket cost is equal ${countBasketPrice(products)}`);