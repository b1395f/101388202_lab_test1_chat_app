var assert = require('assert');
const calculator = require('../app/calculator');

describe("calculator.js tests", function() {

    it("add two numbers", function() {
        assert.equal(calculator.add(5, 2), 7);
    });

    it("subtracts two numbers", function() {
        assert.equal(calculator.sub(5, 2), 3);
    });

    it("multiplies two numbers", function() {
        assert.equal(calculator.mul(5, 2), 10);
    });

    it("divides two numbers", function() {
        assert.equal(calculator.div(10, 2), 5);
    });

    // fail:
    it('fail to add two numbers', function () {
        assert.notEqual(calculator.add(5, 2), 6);
    });

    it('fail to subtract two numbers', function () {
        assert.notEqual(calculator.sub(5, 2), 5);
    });

    it('fail to multiply two numbers', function () {
        assert.notEqual(calculator.mul(5, 2), 12);
    });

    it('fail to divide two numbers', function () {
        assert.notEqual(calculator.div(10, 2), 6);
    });
});