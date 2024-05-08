const fs = require('fs');

const content = fs.readFileSync('./909/input.txt').toString();

let words = content.split(' ');
let count = 0;

words.forEach(word => {
    if(word.trim() !== "")count++;
})


console.log(count);
