import { Request, Response } from 'express';
import { UpdateCourierAvailableCapcity } from '../../Application/UseCases/UpdateCourierAvailableCapcity';
import { PostgresqlCouriersRepository } from '../Repositories/PostgresqlCouriersRepository';

export class UpdateCourierAvailableCapcityController {

    private updateCourierAvailableCapcity;

    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository();

        this.updateCourierAvailableCapcity = new UpdateCourierAvailableCapcity(
            couriersRepository
        );
    }

    public async run(req: Request, res: Response) {
        const { courierId, pickupPackageCapacity, deliveryPackageCapacity } = this.getParams(req);

        await this.updateCourierAvailableCapcity.run(courierId, pickupPackageCapacity, deliveryPackageCapacity);

        this.sendResponse(res)
    }

    private getParams(req: Request) {
        return {
            courierId: req.params.courierId as unknown as number,
            pickupPackageCapacity: req.body.pickupPackageCapacity || 0 as number,
            deliveryPackageCapacity: req.body.deliveryPackageCapacity || 0 as number,
        }
    }

    private sendResponse(res: Response) {
        res.status(200).json();
    }
}