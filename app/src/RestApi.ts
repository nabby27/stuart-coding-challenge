import express, { Express, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
import { CreateCourierController } from './Couriers/Infrastructure/Controllers/CreateCourierController';
import { LookupCourierCapacityController } from './Couriers/Infrastructure/Controllers/LookupCourierCapacityController';
import { exceptionHandler } from './Shared/Infrastructure/exceptionHandler';
import { UpdateCourierAvailableCapcityController } from './Couriers/Infrastructure/Controllers/UpdateCourierAvailableCapcityController';
import { UpdateCourierController } from './Couriers/Infrastructure/Controllers/UpdateCourierController';
import { DeleteCourierController } from './Couriers/Infrastructure/Controllers/DeleteCourierController';

export class RestApi {

    private readonly PORT = process.env.PORT || 3000;
    private _api = express()
    private _server: http.Server | null = null

    constructor() {
        this.addMiddlewares(this._api)
        this.addRoutes(this._api)
        this.addExceptionHandler(this._api)
    }

    public start() {
        this._server = this._api.listen(this.PORT, () => {
            console.log(`Api start at port: ${this.PORT}`);
        })
    }

    public stop() {
        this._server?.close()
    }

    private addMiddlewares(api: express.Express): void {
        api.use(express.json());
        api.use(cors());
    }

    private addRoutes(api: express.Express): void {
        api.post("/couriers", asyncHandler(async (req: Request, res: Response) => new CreateCourierController().run(req, res)))
        api.delete("/couriers/:courierId", asyncHandler(async (req: Request, res: Response) => new DeleteCourierController().run(req, res)))
        api.put("/couriers/:courierId", asyncHandler(async (req: Request, res: Response) => new UpdateCourierController().run(req, res)))
        api.get("/couriers/lookup", asyncHandler(async (req: Request, res: Response) => new LookupCourierCapacityController().run(req, res)))
        api.patch("/couriers/:courierId/availableCapacity", asyncHandler(async (req: Request, res: Response) => new UpdateCourierAvailableCapcityController().run(req, res)))
    }

    private addExceptionHandler(api: Express): void {
        api.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            exceptionHandler(error, res);
            next();
        });
    }

}