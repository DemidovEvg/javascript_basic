// 1. Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида

`use strict`;

function getRightTextCountForm(n, textFormZerro, textFormOne, textFormTwo) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return textFormZerro; }
    if (n1 > 1 && n1 < 5) { return textFormTwo; }
    if (n1 == 1) { return textFormOne; }
    return textFormZerro;
}

let basket = {
    targetSelector: null,
    products: [

    ],
    addProduct(catalogProduct, catalogCount) {
        for (let product of this.products) {
            if (product.name.value === catalogProduct.name.value) {
                return;
            }
        }
        let basketProduct = {};
        Object.assign(basketProduct, catalogProduct, { count: { value: catalogCount, label: 'Количество' } });
        this.products.push(basketProduct);
        this.regenerateBasket();
    },
    resetBasket() {
        this.products = [];
    },
    getBasketSum() {
        let sum = 0;
        for (let product of this.products) {
            sum += product.price.value * product.count.value
        }
        return sum;
    },
    colSize: {
        name: 3,
        price: 2,
        currency: 2,
        count: 2,
        delProduct: 3
    },
    regenerateBasket() {
        let colSize = this.colSize;
        let basketTag = document.querySelector(this.targetSelector);
        basketTag.innerHTML = ''
        let row = `<div class="row"><div class="col">Корзина</div></div>`;

        if (this.products.length) {
            row += '<div class="row">';
            for (let productField in this.products[0]) {
                let label = this.products[0][productField].label;
                row += `<div class="col-${colSize[productField]} d-flex align-items-center justify-content-center">${label}</div>`;
            }
            row += `<div class="col d-flex align-items-center justify-content-center"></div>`;
            row += '</div>';

            for (let productNum in this.products) {

                let product = this.products[productNum];
                let borderBottom = 'border-bottom-0';
                if (+productNum + 1 === this.products.length) {
                    borderBottom = '';
                }
                row += `
                    <div class="row">
                    <div class="col-${colSize.name} d-flex align-items-center border ${borderBottom} border-end-0 border-dark">
                    ${product.name.value}
                    </div>
                    <div class="col-${colSize.price} d-flex align-items-center border ${borderBottom} border-end-0 border-dark">
                    ${product.price.value}
                    </div>
                    <div class="col-${colSize.currency} d-flex align-items-center border ${borderBottom} border-dark">
                    ${product.currency.value}
                    </div>
                    <div class="col-${colSize.count} ${borderBottom}">
                    <input type="number" name="count" id='basket-count-${product.name.value}' data-current-product='${product.name.value}' min="0" max="1000" step="1" class="form-control my-1 recalc-basket">
                    </div>
                    <div class="col-${colSize.delProduct} ${borderBottom}">
                    <button type="button" class="btn btn-secondary del-product" data-current-product='${product.name.value}'>Удалить из корзины</button>
                    </div>
                    </div>`;

            }
            basketTag.insertAdjacentHTML('beforeend', row);
            this.addBasketFooter();
            basketTag.onclick = (event) => {
                let target = event.target;
                if (target.tagName === 'BUTTON' && target.classList.contains('del-product')) {
                    this.delProduct(event);
                } else if (target.tagName === 'INPUT' && target.classList.contains('recalc-basket')) {
                    this.updateCount(event);
                    this.addBasketFooter();
                } else if (target.tagName === 'BUTTON' && target.classList.contains('basket-order')) {
                    ordercomplete();
                }
            }
            basketTag.onkeyup = (event) => {
                let target = event.target;
                if (target.tagName === 'INPUT' && target.classList.contains('recalc-basket')) {
                    this.updateCount(event);
                    this.addBasketFooter();
                }
            }
        } else {
            // Корзина пуста
            row += `<div class="row"><div class="col-${colSize.name + colSize.price + colSize.currency} border border-dark py-2">Корзина пуста</div></div>`;
            basketTag.insertAdjacentHTML('beforeend', row);
        }

        // Необходимо вставить количество товаров в input
        this.insertCount();
    },
    addBasketFooter() {
        this.addResult();
        this.addOrder();
    },
    addOrder() {
        let orderRow = document.querySelector('#basket-order');
        let colSize = this.colSize;

        let row = '';
        let basketTag = document.querySelector(this.targetSelector);

        row += `<div class="row" id='basket-order'>
            <div class="col-${colSize.name}" border border-top-0 border-dark">
            <button type="button" class="btn btn-secondary basket-order">Оформить заказ</button>
            </div>
            </div>`;

        if (orderRow) {
            orderRow.outerHTML = row;
        } else {
            basketTag.insertAdjacentHTML('beforeend', row);
        }

    },
    delProduct(event) {
        let target = event.target;
        if (target.tagName != 'BUTTON' || !target.classList.contains('del-product')) {
            return;
        }

        let currentProductName = target.dataset.currentProduct;

        for (let productNum in this.products) {
            let product = this.products[productNum]
            if (product.name.value === currentProductName) {
                this.products.splice(productNum, 1);
                break;
            }
        }
        this.regenerateBasket();
    },
    addResult() {
        let basketTag = document.querySelector(this.targetSelector);
        let resultRow = basketTag.querySelector('#basket-result');

        let colSize = this.colSize;
        let productsLen = this.products.length;
        let sum = this.getBasketSum();
        let row = '';

        row += `<div class="row py-2" id='basket-result'>
              <div class="col-${colSize.name + colSize.price + colSize.currency}" border border-top-0 border-dark">
             В корзине: 
             ${productsLen} ${getRightTextCountForm(productsLen, 'товаров', 'товар', 'товара')} 
             на сумму 
             ${sum} USD 
             </div>
             </div>`;
        if (resultRow) {
            resultRow.outerHTML = row;
        } else {
            basketTag.insertAdjacentHTML('beforeend', row);
        }

    },
    updateCount(event) {
        let target = event.target;
        let productCount = target.value;
        let productName = target.dataset.currentProduct;
        for (let product of this.products) {
            if (product.name.value === productName) {
                product.count.value = productCount;
            }
        }
    },
    insertCount() {
        for (let product of this.products) {
            let input = document.getElementById(`basket-count-${product.name.value}`);
            input.value = product.count.value;
        }
    },

};

let catalog = {
    targetSelector: null,
    products: [
        {
            name: { value: 'ETH', label: 'Товар' },
            price: { value: 3500, label: 'Цена' },
            currency: { value: 'USD', label: 'Валюта' },
        },
        {
            name: { value: 'BTC', label: 'Товар' },
            price: { value: 42000, label: 'Цена' },
            currency: { value: 'USD', label: 'Валюта' },
        },
        {
            name: { value: 'BNB', label: 'Товар' },
            price: { value: 424, label: 'Цена' },
            currency: { value: 'USD', label: 'Валюта' },
        },
        {
            name: { value: 'XRP', label: 'Товар' },
            price: { value: 0.74, label: 'Цена' },
            currency: { value: 'USD', label: 'Валюта' },
        }
    ],
    regenerateCatalog() {
        let colSize = {
            name: 3,
            price: 2,
            currency: 2,
            count: 2,
            toBasket: 3
        };
        let catalogTag = document.querySelector(this.targetSelector);
        let row = `<div class="row"><div class="col">Каталог</div></div>`;

        if (this.products.length) {
            row += '<div class="row">';
            for (let productField in this.products[0]) {
                let label = this.products[0][productField].label;
                row += `<div class="col-${colSize[productField]} d-flex align-items-center justify-content-center">${label}</div>`;
            }
            row += `<div class="col-${colSize.count} d-flex align-items-center justify-content-center">Количество</div>`;
            row += `<div class="col-${colSize.toBasket} d-flex align-items-center justify-content-center"></div>`;
            row += '</div>';

            for (let productNum in this.products) {

                let product = this.products[productNum];
                let borderBottom = 'border-bottom-0';
                if (+productNum + 1 === this.products.length) {
                    borderBottom = '';
                }
                row += `
                    <div class="row">
                    <div class="col-${colSize.name} d-flex align-items-center border ${borderBottom} border-end-0 border-dark">
                    ${product.name.value}
                    </div>
                    <div class="col-${colSize.price} d-flex align-items-center border ${borderBottom} border-end-0 border-dark">
                    ${product.price.value}
                    </div>
                    <div class="col-${colSize.currency} d-flex align-items-center border ${borderBottom} border-dark">
                    ${product.currency.value}
                    </div>
                    <div class="col-${colSize.count} ${borderBottom}">
                    <input type="number" name="count" id='catalog-count-${product.name.value}' min="0" max="1000" step="1" class="form-control my-1">
                    </div>
                    <div class="col-${colSize.toBasket} ${borderBottom}">
                    <button type="button" class="btn btn-secondary to-basket" data-current-product='${product.name.value}'>В корзину</button>
                    </div>
                    </div>`;

            }
        }
        catalogTag.insertAdjacentHTML('beforeend', row);

        catalogTag.addEventListener('click', (event) => this.addProductToBasket(event));
    },
    addProductToBasket(event) {
        let target = event.target;
        if (target.tagName != 'BUTTON' || !target.classList.contains('to-basket')) {
            return;
        }
        // Добавляем товар в корзину
        // Для этого сначала находим какой текущий товар и количество

        let currentProductName = target.dataset.currentProduct;

        for (let product of this.products) {
            if (product.name.value === currentProductName) {
                let count = document.getElementById(`catalog-count-${product.name.value}`).value;
                basket.addProduct(product, count);
                break;
            }
        }
    }
};

catalog.targetSelector = '#catalog';
catalog.regenerateCatalog();
basket.targetSelector = '#basket';
basket.regenerateBasket();

function ordercomplete() {
    let catalogBlock = document.querySelector(catalog.targetSelector);
    catalogBlock.remove();
    let basketBlock = document.querySelector(basket.targetSelector);
    basketBlock.remove();
    let congratulationBlock = `<div class="container"> 
    <div class="row mt-4">
    Поздравляю вы совершили покупку
    </div>
    </div>`;
    let body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', congratulationBlock);

}