"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourierController = void 0;
const UpdateCourier_1 = require("../../Application/UseCases/UpdateCourier");
const PostgresqlCouriersRepository_1 = require("../Repositories/PostgresqlCouriersRepository");
class UpdateCourierController {
    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository_1.PostgresqlCouriersRepository();
        this.updateCourier = new UpdateCourier_1.UpdateCourier(couriersRepository);
    }
    async run(req, res) {
        const { courierId, maximumCapacity } = this.getParams(req);
        await this.updateCourier.run(courierId, maximumCapacity);
        this.sendResponse(res);
    }
    getParams(req) {
        return {
            courierId: req.params.courierId,
            maximumCapacity: req.body.maximumCapacity || 0,
        };
    }
    sendResponse(res) {
        res.status(200).json();
    }
}
exports.UpdateCourierController = UpdateCourierController;
//# sourceMappingURL=UpdateCourierController.js.map