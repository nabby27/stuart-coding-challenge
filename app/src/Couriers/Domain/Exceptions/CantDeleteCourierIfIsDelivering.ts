import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class CantDeleteCourierIfIsDelivering extends BaseException {

    constructor() {
        super(
            `Can't delete courier if is delivering`,
        );
        Object.setPrototypeOf(this, CantDeleteCourierIfIsDelivering.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}