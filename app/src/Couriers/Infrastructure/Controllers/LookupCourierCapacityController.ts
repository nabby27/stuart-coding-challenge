import { Request, Response } from 'express';
import { LookupCourierCapacity } from '../../Application/UseCases/LookupCourierCapacity';
import { Courier } from '../../Domain/Entities/Courier';
import { PostgresqlCouriersRepository } from '../Repositories/PostgresqlCouriersRepository';

export class LookupCourierCapacityController {

    private lookupCourierCapacity;

    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository();

        this.lookupCourierCapacity = new LookupCourierCapacity(
            couriersRepository
        );
    }

    public async run(req: Request, res: Response) {
        const { capacityRequired } = this.getParams(req);

        const couriers = await this.lookupCourierCapacity.run(capacityRequired);

        this.sendResponse(res, couriers)
    }

    private getParams(req: Request) {
        return {
            capacityRequired: req.body.capacity_required as number,
        }
    }

    private sendResponse(res: Response, couriers: Courier[]) {
        res.status(200).json(couriers.map(courier => courier.toPrimitives()));
    }
}