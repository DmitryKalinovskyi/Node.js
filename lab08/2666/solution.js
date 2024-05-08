const fs = require('fs');
let content = fs.readFileSync("./2666/input.txt").toString();

let n = +content;

for(let i = 0; i < n; i++){

    let ans = "";
    for(let j = 0; j < n; j++){
        if(j + i + 1 === n) ans += "0";
        else if (i + j >= n) ans += '1';
        else ans += "2";
    }

    console.log(ans);
}
// 2 2 2 0
// 2 2 0 1
// 2 0 1 1
// 0 1 1 1