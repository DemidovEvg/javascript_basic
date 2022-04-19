class Wall {
    constructor(freePoints, length = 3) {
        this.length = length;
        this.position = this.getRandomCombination(freePoints);
    }
    getPointObjectFromKey(pointKey) {
        let regexp = /x(?<x>\d+)_y(?<y>\d+)/;
        let point = pointKey.match(regexp).groups;
        return point
    }
    /**
    * @constructor
    * @param {Array<object>}
    */
    getRandomCombination(freePoints) {
        let combinations = this.getAvailableCombinations(freePoints);
        let length = combinations.length;
        let randomNum = Math.floor(Math.random() * length);
        return combinations[randomNum];
    }
    /**
    * @constructor
    * @param {Array<string>}
    */
    getAvailableCombinations(freePoints) {
        // Нужно собрать все строки с столбцы
        let freeMap = [];

        for (let pointKey of freePoints) {
            let pointObj = this.getPointObjectFromKey(pointKey);
            if (!freeMap[pointObj.y]) {
                freeMap[pointObj.y] = []
            }
            freeMap[pointObj.y][pointObj.x] = 1;
        }

        let availableCombinations = []
        let counter = 0;
        let rowNum = 0;
        let colNum = 0;
        for (let row of freeMap) {
            counter = 0;
            colNum = 0;
            let combination = [];
            for (let freeCell of row) {
                if (freeCell) {
                    combination.push({ y: rowNum, x: colNum });
                    counter += 1;
                } else {
                    counter = 0;
                    combination = [];
                }
                if (counter === this.length) {
                    availableCombinations.push(combination);
                    counter = 0;
                    combination = [];
                }
                colNum += 1;
            }
            rowNum += 1;
        }
        rowNum = 0;
        colNum = 0;
        for (let col of freeMap) {
            counter = 0;
            counter = 0;
            rowNum = 0;
            let combination = [];
            for (let freeCell of col) {
                if (freeCell) {
                    combination.push({ y: rowNum, x: colNum });
                    counter += 1;
                } else {
                    counter = 0;
                    combination = [];
                }
                if (counter === this.length) {
                    availableCombinations.push(combination);
                    counter = 0;
                    combination = [];
                }
                rowNum += 1;
            }
            colNum += 1;
        }

        return availableCombinations;
    }
    getPosition() {
        return this.position;
    }
}

export const obstackleSet = {
    obstackles: [],
    init() {
        this.obstackles = [];
    },
    createNewRock(freePoints, length = 3) {
        let obstackle = new Wall(freePoints, length);
        // debugger;
        this.obstackles.push(obstackle);
        console.log(this.obstackles);
    },
    shiftOldRock() {
        this.obstackles.shift();
    },
    isClash(headPoint) {
        for (let obstackleNextPoint of this.getObstacklePoints()) {
            // let headKey = `x${headPoint.x}_y${headPoint.y}`;
            if (obstackleNextPoint.x == headPoint.x
                && obstackleNextPoint.y == headPoint.y) {
                return true;
            }
        }
        return false;
    },
    getObstacklePoints() {
        let obstaclePoints = [];
        for (let obstackle of this.obstackles) {
            for (let point of obstackle.getPosition()) {
                obstaclePoints.push(point);
            }
        }
        return obstaclePoints;
    }
}