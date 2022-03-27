// 3.* Подумать над глобальными сущностями. 
// К примеру, сущность «Продукт» в интернет-магазине актуальна 
// не только для корзины, но и для каталога. Стремиться нужно к тому, 
// чтобы объект «Продукт» имел единую структуру для различных модулей сайта, 
// но в разных местах давал возможность вызывать разные методы.
`use strict`;


let product = {
    id: 10,
    name: 'apple',
    unit: 'kilogram',
    _price: 143,
    available: 200,
    suitability: new Date('2022-04-15'),
    county: 'Maroco',
    storeId: 123,
    rating: 5,
    description: 'Very fresh and tasty',

    changePrice: function ({ newPrice, percentage }) {
        console.log(newPrice);
        console.log(percentage);
        if (newPrice && percentage) {
            throw new Error('Можно указать либо только новую цену, либо процент изменения цены');
        }
        if (!newPrice && !percentage) {
            throw new Error('Не указали ни новую цену ни процент');
        }
        if (newPrice) {
            this._price = newPrice;
        } else {
            this._price = this._price * percentage;
        }
    },

    getPrice: function () {
        return this._price;
    }
}


product.changePrice({ newPrice: 155 });

