const fs = require('fs');
let content = fs.readFileSync("./7336/input.txt").toString();

let [a, b, n] = content.split(' ').map(num => +num);

a *= n;
b *= n;

a += Math.floor(b / 100);
b %= 100;

console.log(a, b);