import { Id } from "../../../Shared/VOs/Id";
import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber";
import { CourierNotFound } from "../../Domain/Exceptions/CourierNotFound";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";

export class UpdateCourier {

    private couriersRepository: CouriersRepository;

    constructor(couriersRepository: CouriersRepository) {
        this.couriersRepository = couriersRepository;
    }

    public async run(courierIdPrimitive: number, maximumCapacityPrimitive: number): Promise<void> {
        const courierId = new Id(courierIdPrimitive)
        const maximumCapacity = new PositiveNumber(maximumCapacityPrimitive)

        const courier = await this.couriersRepository.find(courierId)

        if (!courier) {
            throw new CourierNotFound(courierId.value)
        }

        courier.updateMaximumCapacity(maximumCapacity);

        await this.couriersRepository.save(courier)
    }

}