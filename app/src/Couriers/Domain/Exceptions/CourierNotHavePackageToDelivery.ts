import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class CourierNotHavePackageToDelivery extends BaseException {

    constructor() {
        super(
            `Courier not have package to delivery`,
        );
        Object.setPrototypeOf(this, CourierNotHavePackageToDelivery.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}