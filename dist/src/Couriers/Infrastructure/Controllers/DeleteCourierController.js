"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourierController = void 0;
const DeleteCourier_1 = require("../../Application/UseCases/DeleteCourier");
const PostgresqlCouriersRepository_1 = require("../Repositories/PostgresqlCouriersRepository");
class DeleteCourierController {
    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository_1.PostgresqlCouriersRepository();
        this.deleteCourier = new DeleteCourier_1.DeleteCourier(couriersRepository);
    }
    async run(req, res) {
        const { courierId } = this.getParams(req);
        await this.deleteCourier.run(courierId);
        this.sendResponse(res);
    }
    getParams(req) {
        return {
            courierId: req.params.courierId,
        };
    }
    sendResponse(res) {
        res.status(200).json();
    }
}
exports.DeleteCourierController = DeleteCourierController;
//# sourceMappingURL=DeleteCourierController.js.map