export class Id {

    constructor(
        private _value: number
    ) { }

    get value(): number {
        return this._value;
    }
}