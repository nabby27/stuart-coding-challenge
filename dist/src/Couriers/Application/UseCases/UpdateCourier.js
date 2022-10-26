"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourier = void 0;
const Id_1 = require("../../../Shared/VOs/Id");
const PositiveNumber_1 = require("../../../Shared/VOs/PositiveNumber");
const CourierNotFound_1 = require("../../Domain/Exceptions/CourierNotFound");
class UpdateCourier {
    constructor(couriersRepository) {
        this.couriersRepository = couriersRepository;
    }
    async run(courierIdPrimitive, maximumCapacityPrimitive) {
        const courierId = new Id_1.Id(courierIdPrimitive);
        const maximumCapacity = new PositiveNumber_1.PositiveNumber(maximumCapacityPrimitive);
        const courier = await this.couriersRepository.find(courierId);
        if (!courier) {
            throw new CourierNotFound_1.CourierNotFound(courierId.value);
        }
        courier.updateMaximumCapacity(maximumCapacity);
        await this.couriersRepository.save(courier);
    }
}
exports.UpdateCourier = UpdateCourier;
//# sourceMappingURL=UpdateCourier.js.map