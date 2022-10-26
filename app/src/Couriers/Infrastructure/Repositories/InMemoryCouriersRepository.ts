import { Courier } from "../../Domain/Entities/Courier";
import { Id } from "../../../Shared/VOs/Id";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";
import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber";

export class InMemoryCouriersRepository implements CouriersRepository {

    private static data: { [id: string]: Courier } = {}

    async find(courierId: Id): Promise<Courier> {
        const courier = InMemoryCouriersRepository.data[courierId.value]
        return courier;
    }

    async searchWithAvailableCapacity(capacityRequired: PositiveNumber): Promise<Courier[]> {
        return Object.values(InMemoryCouriersRepository.data).filter((courier) => {
            return courier.availableCapacity.value >= capacityRequired.value
        })
    }

    async save(courier: Courier): Promise<void> {
        InMemoryCouriersRepository.data[courier.id.value] = courier
    }

    async remove(courier: Courier): Promise<void> {
        delete InMemoryCouriersRepository.data[courier.id.value]
    }

}