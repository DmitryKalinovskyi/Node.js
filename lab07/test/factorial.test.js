const assert = require('assert');
const factorial = require('../factorial.js');
describe('factorial', function () {
    it("test 1", () => assert.equal(factorial(5), 120))
    it("test 2", () => assert.equal(factorial(6), 720))
    it("Zero", () => assert.equal(factorial(0), 1))
    it("Negative number", () => assert.equal(factorial(-5), null))
    it("Negative number", () => assert.equal(factorial(-6), null))
});