"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresqlCouriersRepository = void 0;
const Courier_1 = require("../../Domain/Entities/Courier");
const CourierSchema_1 = require("./TypeORM/CourierSchema");
const TypeORMDataSource_1 = require("../../../Shared/Infrastructure/TypeORMDataSource");
const typeorm_1 = require("typeorm");
class PostgresqlCouriersRepository {
    constructor() {
        this.courierRepository = TypeORMDataSource_1.TypeORMDataSource.getRepository(CourierSchema_1.CourierSchemaTypeORM);
    }
    async find(courierId) {
        const courierSaved = await this.courierRepository.findOne({ where: { id: courierId.value } });
        if (!courierSaved) {
            return null;
        }
        return Courier_1.Courier.fromPrimitives(courierSaved);
    }
    async searchWithAvailableCapacity(capacityRequired) {
        const couriersSaved = await this.courierRepository.find({
            where: { availableCapacity: (0, typeorm_1.MoreThanOrEqual)(capacityRequired.value) }
        });
        return couriersSaved.map(Courier_1.Courier.fromPrimitives);
    }
    async save(courier) {
        await this.courierRepository.save(courier.toPrimitives());
    }
    async remove(courier) {
        await this.courierRepository.remove(courier.toPrimitives());
    }
}
exports.PostgresqlCouriersRepository = PostgresqlCouriersRepository;
//# sourceMappingURL=PostgresqlCouriersRepository.js.map