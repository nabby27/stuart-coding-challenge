"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierNotHavePackageToDelivery = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class CourierNotHavePackageToDelivery extends BaseException_1.BaseException {
    constructor() {
        super(`Courier not have package to delivery`);
        Object.setPrototypeOf(this, CourierNotHavePackageToDelivery.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.CourierNotHavePackageToDelivery = CourierNotHavePackageToDelivery;
//# sourceMappingURL=CourierNotHavePackageToDelivery.js.map