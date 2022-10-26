import { Request, Response } from 'express';
import { DeleteCourier } from '../../Application/UseCases/DeleteCourier';
import { PostgresqlCouriersRepository } from '../Repositories/PostgresqlCouriersRepository';

export class DeleteCourierController {

    private deleteCourier;

    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository();

        this.deleteCourier = new DeleteCourier(
            couriersRepository
        );
    }

    public async run(req: Request, res: Response) {
        const { courierId } = this.getParams(req);

        await this.deleteCourier.run(courierId);

        this.sendResponse(res)
    }

    private getParams(req: Request) {
        return {
            courierId: req.params.courierId as unknown as number,
        }
    }

    private sendResponse(res: Response) {
        res.status(200).json();
    }
}