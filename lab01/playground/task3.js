const os = require('os');

const username = os.userInfo()['username'];
console.log(`Hello, ${username}`)
