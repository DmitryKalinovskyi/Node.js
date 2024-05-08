const fs = require("fs");

const content = fs.readFileSync("./85/input.txt").toString();

// split input
const nums = content.split(' ').map(numStr => +numStr);
let [n, i, j] = nums;
i--;
j--;

// generate spiral matrix
let matrix = [];
for(let i = 0; i < n; i++){
    let el = [];
    for(let j = 0; j < n; j++)
    el.push(-1);
    matrix.push(el);
}

function fillSpiralMatrix(matrix, n){
    let x = 0, y = 0;

    // {x, y}
    let dir = [0, 1]

    let i = 1;

    function rotateClockwise(dir){
        let dx = dir[0];
        let dy = dir[1];
        dir[1] = dx;
        dir[0] = -dy;
    }

    while(true){
        matrix[x][y] = i;
        i++;

        if(i > n * n) break;

        while(true){
            // try to move in next cell
            let nextX = x + dir[0];
            let nextY = y + dir[1];

            if(matrix[nextX] !== undefined && matrix[nextX][nextY] === -1){
                // we can move to the next
                x = nextX;
                y = nextY;
                break;
            }
            else{
                rotateClockwise(dir);
            }
        }

    }
}

fillSpiralMatrix(matrix, n);
console.log(matrix[i][j]);