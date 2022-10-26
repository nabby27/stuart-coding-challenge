"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourier = void 0;
const Id_1 = require("../../../Shared/VOs/Id");
const CantDeleteCourierIfIsDelivering_1 = require("../../Domain/Exceptions/CantDeleteCourierIfIsDelivering");
const CourierNotFound_1 = require("../../Domain/Exceptions/CourierNotFound");
class DeleteCourier {
    constructor(couriersRepository) {
        this.couriersRepository = couriersRepository;
    }
    async run(courierIdPrimitive) {
        const courierId = new Id_1.Id(courierIdPrimitive);
        const courier = await this.couriersRepository.find(courierId);
        if (!courier) {
            throw new CourierNotFound_1.CourierNotFound(courierId.value);
        }
        if (courier.havePackageToDelivery()) {
            throw new CantDeleteCourierIfIsDelivering_1.CantDeleteCourierIfIsDelivering();
        }
        await this.couriersRepository.remove(courier);
    }
}
exports.DeleteCourier = DeleteCourier;
//# sourceMappingURL=DeleteCourier.js.map