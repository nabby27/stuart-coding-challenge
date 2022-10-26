import { BaseException } from "./BaseException";

export class InvalidPositiveNumber extends BaseException {

    constructor(value: number) {
        super(
            'Number must be positive',
            {
                value,
            }
        );
        Object.setPrototypeOf(this, InvalidPositiveNumber.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}