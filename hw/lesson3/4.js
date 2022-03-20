// 4. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
// x
// xx
// xxx
// xxxx
// xxxxx
let numRow = 20;
let step = 2;
for (let row = 1; row <= numRow * step; row += step) {
    console.log(`${' '.repeat(numRow - Math.floor(row / 2))}${'x'.repeat(row)}`);
}