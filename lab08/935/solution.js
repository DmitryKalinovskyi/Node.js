const fs = require('fs');
let content = fs.readFileSync("./935/input.txt").toString();

content = content.replace("-", "");
console.log(content[0]);
console.log(content[1]);
console.log(content[2]);