import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class AvailableCapacityCantBeGreaterThanMaximumCapacity extends BaseException {

    constructor() {
        super(
            `Available capacity can't be greater than maximum capacity`,
        );
        Object.setPrototypeOf(this, AvailableCapacityCantBeGreaterThanMaximumCapacity.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}