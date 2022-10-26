"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierCannotExceedMaximumCapacity = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class CourierCannotExceedMaximumCapacity extends BaseException_1.BaseException {
    constructor() {
        super(`Courier can't exceed maximum capacity`, {});
        Object.setPrototypeOf(this, CourierCannotExceedMaximumCapacity.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.CourierCannotExceedMaximumCapacity = CourierCannotExceedMaximumCapacity;
//# sourceMappingURL=CourierCannotExceedMaximumCapacity.js.map