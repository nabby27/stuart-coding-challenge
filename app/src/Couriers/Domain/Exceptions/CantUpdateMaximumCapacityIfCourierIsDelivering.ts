import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class CantUpdateMaximumCapacityIfCourierIsDelivering extends BaseException {

    constructor() {
        super(
            `Can't update maximum capacity if courier is delivering`,
        );
        Object.setPrototypeOf(this, CantUpdateMaximumCapacityIfCourierIsDelivering.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}