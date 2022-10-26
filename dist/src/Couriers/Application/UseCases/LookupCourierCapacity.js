"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupCourierCapacity = void 0;
const PositiveNumber_1 = require("../../../Shared/VOs/PositiveNumber");
class LookupCourierCapacity {
    constructor(couriersRepository) {
        this.couriersRepository = couriersRepository;
    }
    async run(capacityRequiredPrimitive) {
        const capacityRequired = new PositiveNumber_1.PositiveNumber(capacityRequiredPrimitive);
        const couriers = await this.couriersRepository.searchWithAvailableCapacity(capacityRequired);
        return couriers;
    }
}
exports.LookupCourierCapacity = LookupCourierCapacity;
//# sourceMappingURL=LookupCourierCapacity.js.map