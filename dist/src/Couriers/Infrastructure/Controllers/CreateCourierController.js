"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourierController = void 0;
const CreateCourier_1 = require("../../Application/UseCases/CreateCourier");
const PostgresqlCouriersRepository_1 = require("../Repositories/PostgresqlCouriersRepository");
class CreateCourierController {
    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository_1.PostgresqlCouriersRepository();
        this.createCourier = new CreateCourier_1.CreateCourier(couriersRepository);
    }
    async run(req, res) {
        const { courier } = this.getParams(req);
        await this.createCourier.run(courier);
        this.sendResponse(res);
    }
    getParams(req) {
        return {
            courier: {
                id: req.body.id,
                maxCapacity: req.body.max_capacity,
            }
        };
    }
    sendResponse(res) {
        res.status(200).json();
    }
}
exports.CreateCourierController = CreateCourierController;
//# sourceMappingURL=CreateCourierController.js.map