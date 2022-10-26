"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableCapacityCantBeGreaterThanMaximumCapacity = void 0;
const BaseException_1 = require("../../../Shared/Exceptions/BaseException");
class AvailableCapacityCantBeGreaterThanMaximumCapacity extends BaseException_1.BaseException {
    constructor() {
        super(`Available capacity can't be greater than maximum capacity`);
        Object.setPrototypeOf(this, AvailableCapacityCantBeGreaterThanMaximumCapacity.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
exports.AvailableCapacityCantBeGreaterThanMaximumCapacity = AvailableCapacityCantBeGreaterThanMaximumCapacity;
//# sourceMappingURL=AvailableCapacityCantBeGreaterThanMaximumCapacity.js.map