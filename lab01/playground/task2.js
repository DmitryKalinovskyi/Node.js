const fs = require("fs");

fs.appendFile('playground/task2.txt', 'Hello, World!', (err) => {
   console.log(err);
});
