"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourierAvailableCapcity = void 0;
const Id_1 = require("../../../Shared/VOs/Id");
const PositiveNumber_1 = require("../../../Shared/VOs/PositiveNumber");
const CourierNotFound_1 = require("../../Domain/Exceptions/CourierNotFound");
class UpdateCourierAvailableCapcity {
    constructor(couriersRepository) {
        this.couriersRepository = couriersRepository;
    }
    async run(courierIdPrimitive, pickUpPackageCapacityPrimitive, deliveryPackageCapacityPrimitive) {
        const courierId = new Id_1.Id(courierIdPrimitive);
        const pickUpPackageCapacity = new PositiveNumber_1.PositiveNumber(pickUpPackageCapacityPrimitive);
        const deliveryPackageCapacity = new PositiveNumber_1.PositiveNumber(deliveryPackageCapacityPrimitive);
        const courier = await this.couriersRepository.find(courierId);
        if (!courier) {
            throw new CourierNotFound_1.CourierNotFound(courierId.value);
        }
        courier.deliveryPackage(deliveryPackageCapacity);
        courier.pickupPackage(pickUpPackageCapacity);
        await this.couriersRepository.save(courier);
    }
}
exports.UpdateCourierAvailableCapcity = UpdateCourierAvailableCapcity;
//# sourceMappingURL=UpdateCourierAvailableCapcity.js.map