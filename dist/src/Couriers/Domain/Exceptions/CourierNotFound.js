"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierNotFound = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class CourierNotFound extends BaseException_1.BaseException {
    constructor(courierId) {
        super(`Courier with id ${courierId} not found`, {
            courierId,
        });
        Object.setPrototypeOf(this, CourierNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.CourierNotFound = CourierNotFound;
//# sourceMappingURL=CourierNotFound.js.map