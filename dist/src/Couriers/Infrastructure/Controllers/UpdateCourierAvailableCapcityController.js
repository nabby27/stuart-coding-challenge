"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourierAvailableCapcityController = void 0;
const UpdateCourierAvailableCapcity_1 = require("../../Application/UseCases/UpdateCourierAvailableCapcity");
const PostgresqlCouriersRepository_1 = require("../Repositories/PostgresqlCouriersRepository");
class UpdateCourierAvailableCapcityController {
    constructor() {
        const couriersRepository = new PostgresqlCouriersRepository_1.PostgresqlCouriersRepository();
        this.updateCourierAvailableCapcity = new UpdateCourierAvailableCapcity_1.UpdateCourierAvailableCapcity(couriersRepository);
    }
    async run(req, res) {
        const { courierId, pickupPackageCapacity, deliveryPackageCapacity } = this.getParams(req);
        await this.updateCourierAvailableCapcity.run(courierId, pickupPackageCapacity, deliveryPackageCapacity);
        this.sendResponse(res);
    }
    getParams(req) {
        return {
            courierId: req.params.courierId,
            pickupPackageCapacity: req.body.pickupPackageCapacity || 0,
            deliveryPackageCapacity: req.body.deliveryPackageCapacity || 0,
        };
    }
    sendResponse(res) {
        res.status(200).json();
    }
}
exports.UpdateCourierAvailableCapcityController = UpdateCourierAvailableCapcityController;
//# sourceMappingURL=UpdateCourierAvailableCapcityController.js.map