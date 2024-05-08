const fs = require("fs")

const content = fs.readFileSync("./1/input.txt");

const num = content.toString();
console.log(`${num[0]} ${num[1]}`);
