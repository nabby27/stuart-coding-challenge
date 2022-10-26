import { Primitives } from "@codelytv/primitives-type"
import { Id } from "../../../Shared/VOs/Id"
import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber"
import { AvailableCapacityCantBeGreaterThanMaximumCapacity } from "../Exceptions/AvailableCapacityCantBeGreaterThanMaximumCapacity"
import { CourierCannotExceedMaximumCapacity } from "../Exceptions/CourierCannotExceedMaximumCapacity"
import { CantUpdateMaximumCapacityIfCourierIsDelivering } from "../Exceptions/CantUpdateMaximumCapacityIfCourierIsDelivering"
import { CourierNotHavePackageToDelivery } from "../Exceptions/CourierNotHavePackageToDelivery"

export class Courier {

    constructor(
        private _id: Id,
        private _availableCapacity: PositiveNumber,
        private _maximumCapacity: PositiveNumber,
    ) {
        if (_availableCapacity.isGreaterThan(_maximumCapacity)) {
            throw new AvailableCapacityCantBeGreaterThanMaximumCapacity()
        }
    }

    public get id(): Id {
        return this._id
    }

    public get availableCapacity(): PositiveNumber {
        return this._availableCapacity
    }

    public get maximumCapacity(): PositiveNumber {
        return this._maximumCapacity
    }

    public updateMaximumCapacity(maximumCapacity: PositiveNumber): void {
        if (this.havePackageToDelivery()) {
            throw new CantUpdateMaximumCapacityIfCourierIsDelivering();
        }

        this._maximumCapacity = maximumCapacity
        this._availableCapacity = maximumCapacity
    }

    public havePackageToDelivery(): boolean {
        return this.availableCapacity.isDifferent(this.maximumCapacity) &&
            this.availableCapacity.isGreaterThan(new PositiveNumber(0))
    }

    public deliveryPackage(capacity: PositiveNumber): void {
        const isDelivering = capacity.isGreaterThan(new PositiveNumber(0))

        if (isDelivering && !this.havePackageToDelivery()) {
            throw new CourierNotHavePackageToDelivery()
        }

        const newCapacity = this.availableCapacity.increase(capacity)
        this._availableCapacity = newCapacity
    }

    public pickupPackage(capacity: PositiveNumber): void {
        try {
            const newCapacity = this.availableCapacity.decrease(capacity)
            this._availableCapacity = newCapacity
        } catch (error) {
            throw new CourierCannotExceedMaximumCapacity()
        }
    }

    public toPrimitives(): Primitives<Courier> {
        return {
            id: this.id.value,
            availableCapacity: this.availableCapacity.value,
            maximumCapacity: this.maximumCapacity.value
        }
    }

    public static fromPrimitives(primitives: Primitives<Courier>): Courier {
        return new Courier(
            new Id(primitives.id),
            new PositiveNumber(primitives.availableCapacity),
            new PositiveNumber(primitives.maximumCapacity),
        )
    }

    public static create(id: number, maximumCapacity: number) {
        return new Courier(
            new Id(id),
            new PositiveNumber(maximumCapacity),
            new PositiveNumber(maximumCapacity)
        )
    }
}