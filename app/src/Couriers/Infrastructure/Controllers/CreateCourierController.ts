import { Request, Response } from 'express';
import { CreateCourierDTO } from '../../Application/DTOs/CreateCourierDTO';
import { CreateCourier } from '../../Application/UseCases/CreateCourier';
import { PostgresqlCouriersRepository } from '../Repositories/PostgresqlCouriersRepository';

export class CreateCourierController {

    private createCourier;

    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository();

        this.createCourier = new CreateCourier(
            couriersRepository
        );
    }

    public async run(req: Request, res: Response) {
        const { courier } = this.getParams(req);

        await this.createCourier.run(courier);

        this.sendResponse(res)
    }

    private getParams(req: Request): { courier: CreateCourierDTO } {
        return {
            courier: {
                id: req.body.id as number,
                maxCapacity: req.body.max_capacity as number,
            }
        }
    }

    private sendResponse(res: Response) {
        res.status(200).json();
    }
}