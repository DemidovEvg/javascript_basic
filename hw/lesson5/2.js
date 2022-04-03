// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 2.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

`use strict`;

function getRightTextCountForm(n, textFormZerro, textFormOne, textFormTwo) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return textFormZerro; }
    if (n1 > 1 && n1 < 5) { return textFormTwo; }
    if (n1 == 1) { return textFormOne; }
    return textFormZerro;
}


let products = {
    apple: {
        label: 'Яблоки',
        number: 10,
        unit: 'кг.',
        price: 143
    },
    chair: {
        label: 'Стулья',
        number: 7,
        unit: 'шт.',
        price: 1500
    },
    pen: {
        label: 'Карандаши',
        number: 75,
        unit: 'шт.',
        price: 35
    },
};

let basket = {
    countBasketPrice(products) {
        let basketPrice = 0;
        for (let [productName, productData] of Object.entries(products)) {
            let { number, unit, price } = productData;
            basketPrice += number * price;
        }
        return basketPrice;
    },

    generateBasket(products, target) {
        let basketTag = target;
        basketTag.className = 'container';

        for (let [productName, product] of Object.entries(products)) {
            let row = `
            <div class="row">
            <div class="col border border-bottom-0 border-end-0 border-dark">
            ${product.label}
            </div>
            <div class="col-2 border border-bottom-0 border-end-0 border-dark count">
            ${product.number}
            </div>
            <div class="col-2 border border-bottom-0 border-end-0 border-dark count">
            ${product.unit}
            </div>
            <div class="col-2 border border-bottom-0 border-dark price">
            ${product.price}
            </div>
            </div>`;
            basketTag.insertAdjacentHTML('beforeend', row);
        }

        let productsLen = Object.keys(products).length;
        let sum = this.countBasketPrice(products);

        let result = '';
        if (!productsLen) {
            result = `
                <div class="row">
                <div class="col border border-dark">
                Корзина пуста
                </div>
                </div>`;
        } else {
            result = `
            <div class="row">
             <div class="col border border-dark">
            В корзине: 
            ${productsLen} ${getRightTextCountForm(productsLen, 'товаров', 'товар', 'товара')} 
            на сумму 
            ${sum} ${getRightTextCountForm(sum, 'рублей', 'рубль', 'рубля')} 
            </div>
            </div>
            `;
        }
        basketTag.insertAdjacentHTML('beforeend', result);
    }
};
// В корзине: n товаров на сумму m рублей

basket.generateBasket(products, document.querySelector('#basket'));










