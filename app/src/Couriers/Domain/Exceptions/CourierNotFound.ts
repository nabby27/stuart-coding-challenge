import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class CourierNotFound extends BaseException {

    constructor(courierId: number) {
        super(
            `Courier with id ${courierId} not found`,
            {
                courierId,
            }
        );
        Object.setPrototypeOf(this, CourierNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}