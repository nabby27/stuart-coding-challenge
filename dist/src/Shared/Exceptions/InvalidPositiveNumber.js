"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPositiveNumber = void 0;
const BaseException_1 = require("./BaseException");
class InvalidPositiveNumber extends BaseException_1.BaseException {
    constructor(value) {
        super('Number must be positive', {
            value,
        });
        Object.setPrototypeOf(this, InvalidPositiveNumber.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.InvalidPositiveNumber = InvalidPositiveNumber;
//# sourceMappingURL=InvalidPositiveNumber.js.map