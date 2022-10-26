"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateCourier_1 = require("../../../../src/Couriers/Application/UseCases/UpdateCourier");
const Courier_1 = require("../../../../src/Couriers/Domain/Entities/Courier");
const CourierNotFound_1 = require("../../../../src/Couriers/Domain/Exceptions/CourierNotFound");
const CantUpdateMaximumCapacityIfCourierIsDelivering_1 = require("../../../../src/Couriers/Domain/Exceptions/CantUpdateMaximumCapacityIfCourierIsDelivering");
const Id_1 = require("../../../../src/Shared/VOs/Id");
const PositiveNumber_1 = require("../../../../src/Shared/VOs/PositiveNumber");
const TestCouriersRepository_1 = require("../Infrastructure/TestCouriersRepository");
describe('Update courier', () => {
    let courierRepository;
    let updateCourier;
    beforeEach(() => {
        courierRepository = new TestCouriersRepository_1.TestCouriersRepository();
        updateCourier = new UpdateCourier_1.UpdateCourier(courierRepository);
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it(`
        GIVEN an exist courier
        AND a valid maximum capacity
        WHEN update courier
        THEN save successfully
    `, async () => {
        let courierRepositoryFindMock = jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier_1.Courier.create(123, 45));
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });
        await updateCourier.run(123, 50);
        expect(courierRepositoryFindMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 50 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 50 },
        });
    });
    it(`
        GIVEN a non exist courier
        WHEN update courier
        THEN throw courier not found error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        assertThrowErrorAndNotSave(async () => {
            await updateCourier.run(123, 50);
        }, CourierNotFound_1.CourierNotFound);
    });
    it(`
        GIVEN an exist courier
        AND a valid maximum capacity
        AND is delivering
        WHEN update courier
        THEN throw cant update error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => new Courier_1.Courier(new Id_1.Id(123), new PositiveNumber_1.PositiveNumber(20), new PositiveNumber_1.PositiveNumber(45)));
        assertThrowErrorAndNotSave(async () => {
            await updateCourier.run(123, 50);
        }, CantUpdateMaximumCapacityIfCourierIsDelivering_1.CantUpdateMaximumCapacityIfCourierIsDelivering);
    });
    async function assertThrowErrorAndNotSave(action, exception) {
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });
        expect.assertions(2);
        try {
            await action();
        }
        catch (error) {
            expect(error).toBeInstanceOf(exception);
        }
        expect(courierRepositorySaveMock).toBeCalledTimes(0);
    }
});
//# sourceMappingURL=UpdateCourier.test.js.map