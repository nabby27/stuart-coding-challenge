"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courier = void 0;
const Id_1 = require("../../../Shared/VOs/Id");
const PositiveNumber_1 = require("../../../Shared/VOs/PositiveNumber");
const AvailableCapacityCantBeGreaterThanMaximumCapacity_1 = require("../Exceptions/AvailableCapacityCantBeGreaterThanMaximumCapacity");
const CourierCannotExceedMaximumCapacity_1 = require("../Exceptions/CourierCannotExceedMaximumCapacity");
const CantUpdateMaximumCapacityIfCourierIsDelivering_1 = require("../Exceptions/CantUpdateMaximumCapacityIfCourierIsDelivering");
const CourierNotHavePackageToDelivery_1 = require("../Exceptions/CourierNotHavePackageToDelivery");
class Courier {
    constructor(_id, _availableCapacity, _maximumCapacity) {
        this._id = _id;
        this._availableCapacity = _availableCapacity;
        this._maximumCapacity = _maximumCapacity;
        if (_availableCapacity.isGreaterThan(_maximumCapacity)) {
            throw new AvailableCapacityCantBeGreaterThanMaximumCapacity_1.AvailableCapacityCantBeGreaterThanMaximumCapacity();
        }
    }
    get id() {
        return this._id;
    }
    get availableCapacity() {
        return this._availableCapacity;
    }
    get maximumCapacity() {
        return this._maximumCapacity;
    }
    updateMaximumCapacity(maximumCapacity) {
        if (this.havePackageToDelivery()) {
            throw new CantUpdateMaximumCapacityIfCourierIsDelivering_1.CantUpdateMaximumCapacityIfCourierIsDelivering();
        }
        this._maximumCapacity = maximumCapacity;
        this._availableCapacity = maximumCapacity;
    }
    havePackageToDelivery() {
        return this.availableCapacity.isDifferent(this.maximumCapacity) &&
            this.availableCapacity.isGreaterThan(new PositiveNumber_1.PositiveNumber(0));
    }
    deliveryPackage(capacity) {
        const isDelivering = capacity.isGreaterThan(new PositiveNumber_1.PositiveNumber(0));
        if (isDelivering && !this.havePackageToDelivery()) {
            throw new CourierNotHavePackageToDelivery_1.CourierNotHavePackageToDelivery();
        }
        const newCapacity = this.availableCapacity.increase(capacity);
        this._availableCapacity = newCapacity;
    }
    pickupPackage(capacity) {
        try {
            const newCapacity = this.availableCapacity.decrease(capacity);
            this._availableCapacity = newCapacity;
        }
        catch (error) {
            throw new CourierCannotExceedMaximumCapacity_1.CourierCannotExceedMaximumCapacity();
        }
    }
    toPrimitives() {
        return {
            id: this.id.value,
            availableCapacity: this.availableCapacity.value,
            maximumCapacity: this.maximumCapacity.value
        };
    }
    static fromPrimitives(primitives) {
        return new Courier(new Id_1.Id(primitives.id), new PositiveNumber_1.PositiveNumber(primitives.availableCapacity), new PositiveNumber_1.PositiveNumber(primitives.maximumCapacity));
    }
    static create(id, maximumCapacity) {
        return new Courier(new Id_1.Id(id), new PositiveNumber_1.PositiveNumber(maximumCapacity), new PositiveNumber_1.PositiveNumber(maximumCapacity));
    }
}
exports.Courier = Courier;
//# sourceMappingURL=Courier.js.map