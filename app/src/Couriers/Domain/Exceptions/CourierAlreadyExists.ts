import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class CourierAlreadyExists extends BaseException {

    constructor(courierId: number) {
        super(
            `Courier with id ${courierId} already exists`,
            {
                courierId,
            }
        );
        Object.setPrototypeOf(this, CourierAlreadyExists.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}