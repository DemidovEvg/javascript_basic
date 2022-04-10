// 2 * У товара может быть несколько изображений.Нужно:
// a.Реализовать функционал показа полноразмерных картинок товара в модальном окне
// b.Реализовать функционал перехода между картинками внутри модального окна("листалка")

// Код частично взял отсюда https://habr.com/ru/post/519662/

class HystModal {
    constructor(props) {
        let defaultConfig = {
            linkAttributeName: 'data-hystmodal',
        }
        this.config = Object.assign(defaultConfig, props);

        this.init();
    }

    static _shadow = false;

    init() {
        this.isOpened = false; // открыто ли окно
        this.openedWindow = false; //ссылка на открытый .hystmodal
        this._modalBlock = false; //ссылка на открытый .hystmodal__window
        this.starter = false, //ссылка на элемент "открыватель" текущего окна
            // (он нужен для возвращения фокуса на него)
            this._nextWindows = false; //ссылка на .hystmodal который нужно открыть
        this._scrollPosition = 0; //текущая прокрутка (см. выше)

        // Создаём только одну подложку и вставляем её в конец body
        if (!HystModal._shadow) {
            HystModal._shadow = document.createElement('div');
            HystModal._shadow.classList.add('hystmodal__shadow');
            document.body.appendChild(HystModal._shadow);
        }

        //Запускаем метод для обработки событий см. ниже.
        this.eventsFeeler();
    }

    eventsFeeler() {

        /** 
         * Нужно обработать открытие окон по клику на элементы с data-атрибутом
         * который мы установили в конфигурации - this.config.linkAttributeName
         * 
         * Здесь мы используем делегирование события клика, чтобы обойтись одним
         * лишь обработчиком события на элементе html
         * 
         */
        document.addEventListener("click", function (e) {
            const clickedlink = e.target.closest("[" + this.config.linkAttributeName + "]");
            if (clickedlink) {
                e.preventDefault();
                this.starter = clickedlink;
                let targetSelector = this.starter.getAttribute(this.config.linkAttributeName);
                this._nextWindows = document.querySelector(targetSelector);
                this.open();
                return;
            }

            if (e.target.closest('[data-hystclose]')) {
                this.close();
                return;
            }
        }.bind(this));

        //обработаем клавишу escape
        window.addEventListener("keydown", function (e) {
            //закрытие окна по escape
            if (e.which == 27 && this.isOpened) {
                e.preventDefault();
                this.close();
                return;
            }
        }.bind(this));

    }

    open() {
        this.openedWindow = this._nextWindows;
        this.openedWindow.style = 'z-index:99';

        this._modalBlock = this.openedWindow.querySelector('.hystmodal__window');

        /** Вызываем метод управления скроллом
         * он будет блокировать/разблокировать
         * страницу в зависимости от свойства this.isOpened
         */
        this._bodyScrollControl();
        HystModal._shadow.classList.add("hystmodal__shadow--show");
        this.openedWindow.classList.add("hystmodal--active");
        this.openedWindow.setAttribute('aria-hidden', 'false');

        // this.focusContol(); //вызываем метод перевода фокуса (см. ниже)
        this.modalImg = this._modalBlock.querySelector('#modal-img');
        this.modalImg.src = this.starter.dataset.largeImg;

        this.shifterPreviousImg = this._modalBlock.querySelector('div[data-previous-img]');
        this.shifterNextImg = this._modalBlock.querySelector('div[data-next-img]');

        this.reloadShifters(this.starter);

        this.shifterNextImg.addEventListener('click', (event) => { this.switchNextImg(event) });
        this.shifterPreviousImg.addEventListener('click', (event) => { this.switchPreviousImg(event) });

        this.isOpened = true;
    }

    switchNextImg(event) {
        let shifterNextImg = event.target;
        this.modalImg.src = shifterNextImg.dataset.nextImg;
        this.reloadShifters(this.nextSmallImg);
    }

    switchPreviousImg(event) {
        let shifterPreviousImg = event.target;
        this.modalImg.src = shifterPreviousImg.dataset.previousImg;
        this.reloadShifters(this.previousSmallImg);
    }


    reloadShifters(currentSmallImg) {
        if (currentSmallImg.nextElementSibling?.tagName === 'IMG') {
            this.nextSmallImg = currentSmallImg.nextElementSibling;
        } else {
            this.nextSmallImg = currentSmallImg.parentElement.firstElementChild;
        }
        this.shifterNextImg.dataset.nextImg = this.nextSmallImg.dataset.largeImg;

        if (currentSmallImg.previousElementSibling?.tagName === 'IMG') {
            this.previousSmallImg = currentSmallImg.previousElementSibling;
        } else {
            this.previousSmallImg = currentSmallImg.parentElement.lastElementChild;
        }
        this.shifterPreviousImg.dataset.previousImg = this.previousSmallImg.dataset.largeImg;
    }



    close() {
        this.openedWindow = this._nextWindows;
        this.openedWindow.style = 'z-index:-1';

        if (!this.isOpened) {
            return;
        }
        this.openedWindow.classList.remove("hystmodal--active");
        HystModal._shadow.classList.remove("hystmodal__shadow--show");
        this.openedWindow.setAttribute('aria-hidden', 'true');

        //возвращаем скролл
        this._bodyScrollControl();
        this.isOpened = false;
    }

    _bodyScrollControl() {

        let html = document.documentElement;
        if (this.isOpened === true) {
            //разблокировка страницы
            html.classList.remove("hystmodal__opened");
            html.style.marginRight = "";
            window.scrollTo(0, this._scrollPosition);
            html.style.top = "";
            return;
        }

        //блокировка страницы
        this._scrollPosition = window.pageYOffset;
        html.style.top = -this._scrollPosition + "px";
        html.classList.add("hystmodal__opened");
    }

}

const myModal = new HystModal({
    linkAttributeName: 'data-hystmodal',
});