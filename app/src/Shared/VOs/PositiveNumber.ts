import { InvalidPositiveNumber } from "../Exceptions/InvalidPositiveNumber";

export class PositiveNumber {

    constructor(
        private _value: number
    ) {
        this.ensureIsValid(_value);
    }

    get value(): number {
        return this._value;
    }

    public decrease(number: PositiveNumber): PositiveNumber {
        return new PositiveNumber(this._value - number.value);
    }

    public increase(number: PositiveNumber): PositiveNumber {
        return new PositiveNumber(this._value + number.value);
    }

    public isGreaterThan(number: PositiveNumber): boolean {
        return this._value > number.value;
    }

    public isEqual(number: PositiveNumber): boolean {
        return this._value === number.value;
    }

    public isDifferent(number: PositiveNumber): boolean {
        return !this.isEqual(number);
    }

    private ensureIsValid(value: number) {
        if (value < 0) {
            throw new InvalidPositiveNumber(value);
        }
    }
}