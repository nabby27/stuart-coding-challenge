import { Request, Response } from 'express';
import { UpdateCourier } from '../../Application/UseCases/UpdateCourier';
import { PostgresqlCouriersRepository } from '../Repositories/PostgresqlCouriersRepository';

export class UpdateCourierController {

    private updateCourier;

    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository();

        this.updateCourier = new UpdateCourier(
            couriersRepository
        );
    }

    public async run(req: Request, res: Response) {
        const { courierId, maximumCapacity } = this.getParams(req);

        await this.updateCourier.run(courierId, maximumCapacity);

        this.sendResponse(res)
    }

    private getParams(req: Request) {
        return {
            courierId: req.params.courierId as unknown as number,
            maximumCapacity: req.body.maximumCapacity || 0 as number,
        }
    }

    private sendResponse(res: Response) {
        res.status(200).json();
    }
}