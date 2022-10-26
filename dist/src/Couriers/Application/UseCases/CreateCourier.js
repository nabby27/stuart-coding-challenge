"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourier = void 0;
const Courier_1 = require("../../Domain/Entities/Courier");
const Id_1 = require("../../../Shared/VOs/Id");
const CourierAlreadyExists_1 = require("../../Domain/Exceptions/CourierAlreadyExists");
class CreateCourier {
    constructor(couriersRepository) {
        this.couriersRepository = couriersRepository;
    }
    async run(newCourier) {
        const existCourier = await this.couriersRepository.find(new Id_1.Id(newCourier.id));
        if (existCourier) {
            throw new CourierAlreadyExists_1.CourierAlreadyExists(existCourier.id.value);
        }
        const courier = Courier_1.Courier.create(newCourier.id, newCourier.maxCapacity);
        await this.couriersRepository.save(courier);
    }
}
exports.CreateCourier = CreateCourier;
//# sourceMappingURL=CreateCourier.js.map