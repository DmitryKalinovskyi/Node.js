const fs = require('fs');

const content = fs.readFileSync('./916/input.txt').toString();
let [a, b, c, d] = content.split(' ').map(num => +num);

if(a > b)
    [a, b] = [b, a];

if(c > d)
    [c, d] = [d, c];

let s = new Set();
for(let i = a; i <= b; i++)
    for(let j = c; j <= d; j++){
        s.add(i * j);
    }

console.log(s.size);