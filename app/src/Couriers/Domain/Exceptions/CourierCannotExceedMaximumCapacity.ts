import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class CourierCannotExceedMaximumCapacity extends BaseException {

    constructor() {
        super(
            `Courier can't exceed maximum capacity`,
            {
            }
        );
        Object.setPrototypeOf(this, CourierCannotExceedMaximumCapacity.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}