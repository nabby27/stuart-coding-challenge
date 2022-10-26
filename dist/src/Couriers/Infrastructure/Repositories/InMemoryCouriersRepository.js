"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCouriersRepository = void 0;
class InMemoryCouriersRepository {
    async find(courierId) {
        const courier = InMemoryCouriersRepository.data[courierId.value];
        return courier;
    }
    async searchWithAvailableCapacity(capacityRequired) {
        return Object.values(InMemoryCouriersRepository.data).filter((courier) => {
            return courier.availableCapacity.value >= capacityRequired.value;
        });
    }
    async save(courier) {
        InMemoryCouriersRepository.data[courier.id.value] = courier;
    }
    async remove(courier) {
        delete InMemoryCouriersRepository.data[courier.id.value];
    }
}
exports.InMemoryCouriersRepository = InMemoryCouriersRepository;
InMemoryCouriersRepository.data = {};
//# sourceMappingURL=InMemoryCouriersRepository.js.map