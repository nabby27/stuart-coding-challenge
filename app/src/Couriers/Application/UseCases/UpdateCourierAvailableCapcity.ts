import { Id } from "../../../Shared/VOs/Id";
import { PositiveNumber } from "../../../Shared/VOs/PositiveNumber";
import { CourierNotFound } from "../../Domain/Exceptions/CourierNotFound";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";

export class UpdateCourierAvailableCapcity {

    private couriersRepository: CouriersRepository;

    constructor(couriersRepository: CouriersRepository) {
        this.couriersRepository = couriersRepository;
    }

    public async run(courierIdPrimitive: number, pickUpPackageCapacityPrimitive: number, deliveryPackageCapacityPrimitive: number): Promise<void> {
        const courierId = new Id(courierIdPrimitive);
        const pickUpPackageCapacity = new PositiveNumber(pickUpPackageCapacityPrimitive);
        const deliveryPackageCapacity = new PositiveNumber(deliveryPackageCapacityPrimitive);

        const courier = await this.couriersRepository.find(courierId);

        if (!courier) {
            throw new CourierNotFound(courierId.value)
        }

        courier.deliveryPackage(deliveryPackageCapacity)
        courier.pickupPackage(pickUpPackageCapacity)

        await this.couriersRepository.save(courier);
    }

}