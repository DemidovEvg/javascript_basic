import { config } from './config.js';
import { map } from './map.js';
import { snake } from './snake.js';
import { food } from './food.js';
import { status } from './status.js';
import { obstackleSet } from './obstacle.js';

// 1. Выводить счёт в режиме реального времени.
// 2. Генерировать временные препятствия на поле.
// 3. *Убрать границы поля. Т.е. при пересечении границы поля змейка появляется с противоположной стороны.

const game = {
    config,
    startConfig: Object.assign({}, config),
    map,
    snake,
    food,
    status,
    obstackleSet,
    counter: 0,
    tickInterval: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const error of validation.errors) {
                console.log(error);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();
    },

    setEventHandlers() {
        document
            .getElementById('playButton')
            .addEventListener('click', this.playClickHandler.bind(this));
        document
            .getElementById('newGameButton')
            .addEventListener('click', this.reset.bind(this));
        document
            .addEventListener('keydown', this.keyDownHandler.bind(this));
    },

    playClickHandler() {
        if (this.status.isPlaying()) this.stop();
        else if (this.status.isStopped()) this.play();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    reset() {
        this.stop();
        this.confing = Object.assign({}, this.startConfig);
        console.log(this.confing);
        this.snake.init(this.getStartSnakeBody(),
            'up',
            this.config.getRowsCount(),
            this.config.getColsCount()
        );
        this.food.setCoordinates(this.getRandomFreeCoordinate());
        this.obstackleSet.init();
        this.counter = 0;
        let message = document.getElementById('message');
        message.textContent = '';
        this.render();
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinate() {
        const exclude = [this.food.getCoordinates(),
        ...this.snake.getBody(),
        ...this.obstackleSet.getObstacklePoints()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some((exPoint) => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(this.tickHandler.bind(this), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;

        if (isDisabled) {
            playButton.classList.add('disabled');
        } else {
            playButton.classList.remove('disabled');
        }
    },

    tickHandler() {
        let message = document.getElementById('message');
        this.counter += 1;
        const nextHeadPoint = this.snake.getNextStepHeadPoint();
        if (!this.canMakeStep(nextHeadPoint)) {
            message.textContent = 'Вы проиграли';
            return this.finish();
        }

        if (this.food.isOnPoint(nextHeadPoint)) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinate());

            if (this.isGameWon()) {

                message.textContent = 'Вы победили';
                this.finish();
            }
            message.textContent = 'Ням';
            setTimeout(() => { message.textContent = '' }, 3000)

        }

        this.snake.makeStep();
        // Каждые config.speedObstacle тиков устанавливаем стену
        if (this.counter % this.config.getSpeedObstacle() === 0) {
            this.obstackleSet.createNewRock(this.map.getUnusedPoints(), this.config.getLengthObstacle());
        }

        if (this.counter > this.config.getSpeedObstacle() * 3
            && this.counter % this.config.getSpeedObstacle() === 0) {
            this.obstackleSet.shiftOldRock();
        }

        this.render();

    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    canMakeStep(nextHeadPoint) {

        const isNotSameHeadPoint = !this.snake.isOnPoint(nextHeadPoint);

        const isClashToObstacle = this.obstackleSet.isClash(nextHeadPoint);

        return isNotSameHeadPoint && !isClashToObstacle;
    },

    render() {
        this.map.render(this.snake.getBody(),
            this.food.getCoordinates(),
            this.obstackleSet.getObstacklePoints());
        this.showResult();
    },
    showResult() {
        let score = document.getElementById('score');
        score.textContent = this.snake.getLength() - 1;
    },
};


let settings = {
    speed: 4,
    winFoodCount: 5,
}

game.init(settings);