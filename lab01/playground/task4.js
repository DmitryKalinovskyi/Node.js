const lodash = require('lodash')

console.log("compact: " + lodash.compact([1, 2, 3, 0]));

console.log("concat: " + lodash.concat([1, 2, 3], [4, 3, 2, 1]));

console.log("difference: " + lodash.difference([1, 2, 3], [1, 2]));

console.log("drop: " + lodash.drop([1, 2, 3, 4], 2));

console.log("union: " + lodash.union([1, 2, 3], [2, 3, 4]));