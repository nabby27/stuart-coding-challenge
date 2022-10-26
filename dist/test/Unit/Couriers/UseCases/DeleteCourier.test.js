"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteCourier_1 = require("../../../../src/Couriers/Application/UseCases/DeleteCourier");
const Courier_1 = require("../../../../src/Couriers/Domain/Entities/Courier");
const CantDeleteCourierIfIsDelivering_1 = require("../../../../src/Couriers/Domain/Exceptions/CantDeleteCourierIfIsDelivering");
const CourierNotFound_1 = require("../../../../src/Couriers/Domain/Exceptions/CourierNotFound");
const Id_1 = require("../../../../src/Shared/VOs/Id");
const PositiveNumber_1 = require("../../../../src/Shared/VOs/PositiveNumber");
const TestCouriersRepository_1 = require("../Infrastructure/TestCouriersRepository");
describe('Delete courier', () => {
    let courierRepository;
    let deleteCourier;
    beforeEach(() => {
        courierRepository = new TestCouriersRepository_1.TestCouriersRepository();
        deleteCourier = new DeleteCourier_1.DeleteCourier(courierRepository);
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it(`
        GIVEN an exist courier id
        WHEN delete a courier
        THEN delete successfully
    `, async () => {
        let courierRepositoryFindMock = jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier_1.Courier.create(123, 45));
        let courierRepositoryRemoveMock = jest.spyOn(courierRepository, 'remove')
            .mockImplementation(async () => { });
        await deleteCourier.run(123);
        expect(courierRepositoryFindMock).toBeCalledTimes(1);
        expect(courierRepositoryRemoveMock).toBeCalledTimes(1);
        expect(courierRepositoryRemoveMock).toBeCalledWith({
            _availableCapacity: { _value: 45 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 }
        });
    });
    it(`
        GIVEN a not exist courier id
        WHEN delete a courier
        THEN throw courier not found error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        assertThrowErrorAndNotDelete(async () => {
            await deleteCourier.run(123);
        }, CourierNotFound_1.CourierNotFound);
    });
    it(`
        GIVEN an exist courier id
        AND courier is delivering
        WHEN delete a courier
        THEN throw can't delete courier error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => new Courier_1.Courier(new Id_1.Id(123), new PositiveNumber_1.PositiveNumber(30), new PositiveNumber_1.PositiveNumber(45)));
        assertThrowErrorAndNotDelete(async () => {
            await deleteCourier.run(123);
        }, CantDeleteCourierIfIsDelivering_1.CantDeleteCourierIfIsDelivering);
    });
    async function assertThrowErrorAndNotDelete(action, exception) {
        let courierRepositoryRemoveMock = jest.spyOn(courierRepository, 'remove')
            .mockImplementation(async () => { });
        expect.assertions(2);
        try {
            await action();
        }
        catch (error) {
            expect(error).toBeInstanceOf(exception);
        }
        expect(courierRepositoryRemoveMock).toBeCalledTimes(0);
    }
});
//# sourceMappingURL=DeleteCourier.test.js.map