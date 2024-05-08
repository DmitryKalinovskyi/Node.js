const fs = require('fs');
const content = fs.readFileSync("./930/input.txt").toString();

let missed = [];

let digits = "0123456789"

for(let digit in digits){
    if(content.indexOf(digit) === -1)
        missed.push(digit);
}

console.log(missed.length);
console.log(missed.join(' '));