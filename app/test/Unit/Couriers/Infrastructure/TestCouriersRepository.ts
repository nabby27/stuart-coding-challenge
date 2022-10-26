import { Courier } from "../../../../src/Couriers/Domain/Entities/Courier"
import { CouriersRepository } from "../../../../src/Couriers/Domain/Repositories/CouriersRepository"
import { Id } from "../../../../src/Shared/VOs/Id"
import { PositiveNumber } from "../../../../src/Shared/VOs/PositiveNumber"

export class TestCouriersRepository implements CouriersRepository {

    async find(courierId: Id): Promise<Courier | null> {
        throw new Error('')
    }

    async searchWithAvailableCapacity(capacityRequired: PositiveNumber): Promise<Courier[]> {
        throw new Error('')
    }

    async save(courier: Courier): Promise<void> {
        throw new Error('')
    }

    async remove(courier: Courier): Promise<void> {
        throw new Error('')
    }

}