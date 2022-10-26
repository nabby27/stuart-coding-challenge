import { Courier } from "../../Domain/Entities/Courier";
import { Id } from "../../../Shared/VOs/Id";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";
import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber";
import { CourierSchemaTypeORM } from "./TypeORM/CourierSchema";
import { TypeORMDataSource } from "../../../Shared/Infrastructure/TypeORMDataSource";
import { MoreThanOrEqual } from "typeorm";

export class PostgresqlCouriersRepository implements CouriersRepository {

    private courierRepository;

    constructor() {
        this.courierRepository = TypeORMDataSource.getRepository(CourierSchemaTypeORM)
    }

    async find(courierId: Id): Promise<Courier | null> {
        const courierSaved = await this.courierRepository.findOne({ where: { id: courierId.value } });

        if (!courierSaved) {
            return null;
        }

        return Courier.fromPrimitives(courierSaved)
    }

    async searchWithAvailableCapacity(capacityRequired: PositiveNumber): Promise<Courier[]> {
        const couriersSaved = await this.courierRepository.find({
            where: { availableCapacity: MoreThanOrEqual(capacityRequired.value) }
        });

        return couriersSaved.map(Courier.fromPrimitives)
    }

    async save(courier: Courier): Promise<void> {
        await this.courierRepository.save(courier.toPrimitives());
    }

    async remove(courier: Courier): Promise<void> {
        await this.courierRepository.remove(courier.toPrimitives());
    }

}