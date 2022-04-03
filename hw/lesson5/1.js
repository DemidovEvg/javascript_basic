// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать 
// любые html-теги по своему желанию. Доска должна быть разлинована соответствующим 
// образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами 
// от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H. 
// (использовать createElement / appendChild)

// let div = document.createElement('div');
let target = document.querySelector('.chess-board');
let isWhiteCell = true;

for (let row = 1; row < 8; row++) {
    let chess_row = document.createElement('div');
    chess_row.classList = 'chess-row';

    let label_num = document.createElement('div');
    label_num.classList = 'label label-num';

    let label_num_content = document.createElement('div');
    label_num_content.classList = 'label-num-content';

    target.append(chess_row);
    chess_row.append(label_num);
    label_num.append(label_num_content);
    label_num_content.textContent = row;

    for (let col = 'A';
        col < 'H';
        col = String.fromCodePoint((col.codePointAt() + 1))) {
        let cell = document.createElement('div');
        if (isWhiteCell) {
            cell.classList = 'white cell';
        } else {
            cell.classList = 'black cell';
        }
        chess_row.append(cell);
        isWhiteCell = !isWhiteCell;
    }
}

let chess_row_labels = document.createElement('div');
chess_row_labels.classList = 'chess-row chess-row-labels';

let label_empty = document.createElement('div');
label_empty.classList = 'label label-letter';

target.append(chess_row_labels);
chess_row_labels.append(label_empty);


for (let col = 'A';
    col < 'H';
    col = String.fromCodePoint((col.codePointAt() + 1))) {
    let label_letter = document.createElement('div');
    label_letter.classList = 'label label-letter';

    let label_letter_content = document.createElement('div');
    label_letter_content.classList = 'label-letter-content';
    label_letter_content.textContent = col;

    label_letter.append(label_letter_content);

    chess_row_labels.append(label_letter);
}

