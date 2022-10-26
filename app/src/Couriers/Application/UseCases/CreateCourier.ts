import { Courier } from "../../Domain/Entities/Courier";
import { CouriersRepository } from "../../Domain/Repositories/CouriersRepository";
import { CreateCourierDTO } from "../DTOs/CreateCourierDTO";
import { Id } from "../../../Shared/VOs/Id";
import { CourierAlreadyExists } from "../../Domain/Exceptions/CourierAlreadyExists";

export class CreateCourier {

    private couriersRepository: CouriersRepository;

    constructor(couriersRepository: CouriersRepository) {
        this.couriersRepository = couriersRepository;
    }

    public async run(newCourier: CreateCourierDTO): Promise<void> {
        const existCourier = await this.couriersRepository.find(new Id(newCourier.id));

        if (existCourier) {
            throw new CourierAlreadyExists(existCourier.id.value)
        }

        const courier = Courier.create(newCourier.id, newCourier.maxCapacity)

        await this.couriersRepository.save(courier);
    }

}