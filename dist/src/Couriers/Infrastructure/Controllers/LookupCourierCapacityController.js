"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupCourierCapacityController = void 0;
const LookupCourierCapacity_1 = require("../../Application/UseCases/LookupCourierCapacity");
const PostgresqlCouriersRepository_1 = require("../Repositories/PostgresqlCouriersRepository");
class LookupCourierCapacityController {
    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository_1.PostgresqlCouriersRepository();
        this.lookupCourierCapacity = new LookupCourierCapacity_1.LookupCourierCapacity(couriersRepository);
    }
    async run(req, res) {
        const { capacityRequired } = this.getParams(req);
        const couriers = await this.lookupCourierCapacity.run(capacityRequired);
        this.sendResponse(res, couriers);
    }
    getParams(req) {
        return {
            capacityRequired: req.body.capacity_required,
        };
    }
    sendResponse(res, couriers) {
        res.status(200).json(couriers.map(courier => courier.toPrimitives()));
    }
}
exports.LookupCourierCapacityController = LookupCourierCapacityController;
//# sourceMappingURL=LookupCourierCapacityController.js.map