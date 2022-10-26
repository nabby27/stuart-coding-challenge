"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CantDeleteCourierIfIsDelivering = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class CantDeleteCourierIfIsDelivering extends BaseException_1.BaseException {
    constructor() {
        super(`Can't delete courier if is delivering`);
        Object.setPrototypeOf(this, CantDeleteCourierIfIsDelivering.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.CantDeleteCourierIfIsDelivering = CantDeleteCourierIfIsDelivering;
//# sourceMappingURL=CantDeleteCourierIfIsDelivering.js.map