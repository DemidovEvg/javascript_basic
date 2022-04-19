export const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,
    maxRow: null,
    maxCol: null,

    init(startBody, direction, maxRow, maxCol) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
        this.maxRow = maxRow;
        this.maxCol = maxCol;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;

        this.getBody().unshift(this.getNextStepHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const snakeBody = this.getBody();
        const lastBodyIndex = snakeBody.length - 1;
        const lastBodyPoint = snakeBody[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        snakeBody.push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];
        const nextHeadPoint = { x: firstPoint.x, y: firstPoint.y };

        switch (this.direction) {
            case 'up':
                if (firstPoint.y === 0) {
                    nextHeadPoint.y = this.maxRow - 1;
                } else {
                    nextHeadPoint.y -= 1
                }
                return nextHeadPoint
            case 'right':
                if (firstPoint.x === this.maxCol - 1) {
                    nextHeadPoint.x = 0;
                } else {
                    nextHeadPoint.x += 1
                }
                return nextHeadPoint;
            case 'down':
                if (firstPoint.y === this.maxRow - 1) {
                    nextHeadPoint.y = 0;
                } else {
                    nextHeadPoint.y += 1
                }
                return nextHeadPoint;
            case 'left':
                if (firstPoint.x === 0) {
                    nextHeadPoint.x = this.maxCol - 1;
                } else {
                    nextHeadPoint.x -= 1
                }
                return nextHeadPoint;
        }
    },
    getLength() {
        return this.body.length;
    }
};