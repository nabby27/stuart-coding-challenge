"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositiveNumber = void 0;
const InvalidPositiveNumber_1 = require("../Exceptions/InvalidPositiveNumber");
class PositiveNumber {
    constructor(_value) {
        this._value = _value;
        this.ensureIsValid(_value);
    }
    get value() {
        return this._value;
    }
    decrease(number) {
        return new PositiveNumber(this._value - number.value);
    }
    increase(number) {
        return new PositiveNumber(this._value + number.value);
    }
    isGreaterThan(number) {
        return this._value > number.value;
    }
    isEqual(number) {
        return this._value === number.value;
    }
    isDifferent(number) {
        return !this.isEqual(number);
    }
    ensureIsValid(value) {
        if (value < 0) {
            throw new InvalidPositiveNumber_1.InvalidPositiveNumber(value);
        }
    }
}
exports.PositiveNumber = PositiveNumber;
//# sourceMappingURL=PositiveNumber.js.map