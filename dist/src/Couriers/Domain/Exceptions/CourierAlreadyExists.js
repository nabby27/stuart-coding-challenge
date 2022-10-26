"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierAlreadyExists = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class CourierAlreadyExists extends BaseException_1.BaseException {
    constructor(courierId) {
        super(`Courier with id ${courierId} already exists`, {
            courierId,
        });
        Object.setPrototypeOf(this, CourierAlreadyExists.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.CourierAlreadyExists = CourierAlreadyExists;
//# sourceMappingURL=CourierAlreadyExists.js.map