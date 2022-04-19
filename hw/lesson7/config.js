export const config = {
    settings: {
        rowsCount: 21,
        colsCount: 21,
        speed: 2,
        winFoodCount: 50,
        speedObstacle: 10,
        lengthObstacle: 3
    },

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    getSpeedObstacle() {
        return this.settings.speedObstacle;
    },
    getLengthObstacle() {
        return this.settings.lengthObstacle;
    },
    setSpeedObstacle(speedObstacle) {
        this.settings.speedObstacle = speedObstacle;
    },
    setLengthObstacle(lengthObstacle) {
        this.settings.lengthObstacle = lengthObstacle;
    },


    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getSpeedObstacle() < 2 || this.getSpeedObstacle() > 100) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speedObstacle должно быть в диапазоне [2, 100].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};