export const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {}; // {x1_y2: td, x3_y6: td, ...}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                const key = `x${col}_y${row}`;
                this.cells[key] = td;
            }
        }
        this.getUnusedPoints();
    },

    render(snakePointsArray, foodPoint, obstackles) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        const foodCellKey = `x${foodPoint.x}_y${foodPoint.y}`;
        const foodCell = this.cells[foodCellKey];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        snakePointsArray.forEach((point, index) => {
            const snakeCellKey = `x${point.x}_y${point.y}`;
            const snakeCell = this.cells[snakeCellKey];
            const snakeCellClass = index === 0 ? 'snakeHead' : 'snakeBody';
            // console.log(snakeCellKey);
            snakeCell.classList.add(snakeCellClass);

            this.usedCells.push(snakeCell);
        })
        // console.log(obstackles);
        obstackles.forEach((point, index) => {
            const obstackleCellKey = `x${point.x}_y${point.y}`;
            const obstackleCell = this.cells[obstackleCellKey];
            const obstackleCellClass = 'rock';
            obstackleCell.classList.add(obstackleCellClass);
            this.usedCells.push(obstackleCell);
        });
    },
    getUnusedPoints() {
        const unused = [];
        for (let [key, cell] of Object.entries(this.cells)) {
            if (!this.usedCells.includes(cell)) {
                unused.push(key);
            }
        }
        return unused;
    }
};
