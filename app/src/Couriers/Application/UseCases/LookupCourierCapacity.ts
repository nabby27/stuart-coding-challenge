import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber";
import { Courier } from "../../Domain/Entities/Courier";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";

export class LookupCourierCapacity {

    private couriersRepository: CouriersRepository;

    constructor(couriersRepository: CouriersRepository) {
        this.couriersRepository = couriersRepository;
    }

    public async run(capacityRequiredPrimitive: number): Promise<Courier[]> {
        const capacityRequired = new PositiveNumber(capacityRequiredPrimitive);

        const couriers = await this.couriersRepository.searchWithAvailableCapacity(capacityRequired);


        return couriers;
    }

}