import { Id } from "../../../Shared/VOs/Id";
import { CantDeleteCourierIfIsDelivering } from "../../Domain/Exceptions/CantDeleteCourierIfIsDelivering";
import { CourierNotFound } from "../../Domain/Exceptions/CourierNotFound";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";

export class DeleteCourier {

    private couriersRepository: CouriersRepository;

    constructor(couriersRepository: CouriersRepository) {
        this.couriersRepository = couriersRepository;
    }

    public async run(courierIdPrimitive: number): Promise<void> {
        const courierId = new Id(courierIdPrimitive)

        const courier = await this.couriersRepository.find(courierId)

        if (!courier) {
            throw new CourierNotFound(courierId.value)
        }

        if (courier.havePackageToDelivery()) {
            throw new CantDeleteCourierIfIsDelivering()
        }

        await this.couriersRepository.remove(courier)
    }

}