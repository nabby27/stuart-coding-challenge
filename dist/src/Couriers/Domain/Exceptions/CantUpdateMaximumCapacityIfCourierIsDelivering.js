"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CantUpdateMaximumCapacityIfCourierIsDelivering = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class CantUpdateMaximumCapacityIfCourierIsDelivering extends BaseException_1.BaseException {
    constructor() {
        super(`Can't update maximum capacity if courier is delivering`);
        Object.setPrototypeOf(this, CantUpdateMaximumCapacityIfCourierIsDelivering.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.CantUpdateMaximumCapacityIfCourierIsDelivering = CantUpdateMaximumCapacityIfCourierIsDelivering;
//# sourceMappingURL=CantUpdateMaximumCapacityIfCourierIsDelivering.js.map