"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateCourierAvailableCapcity_1 = require("../../../../src/Couriers/Application/UseCases/UpdateCourierAvailableCapcity");
const Courier_1 = require("../../../../src/Couriers/Domain/Entities/Courier");
const CourierCannotExceedMaximumCapacity_1 = require("../../../../src/Couriers/Domain/Exceptions/CourierCannotExceedMaximumCapacity");
const CourierNotFound_1 = require("../../../../src/Couriers/Domain/Exceptions/CourierNotFound");
const CourierNotHavePackageToDelivery_1 = require("../../../../src/Couriers/Domain/Exceptions/CourierNotHavePackageToDelivery");
const InvalidPositiveNumber_1 = require("../../../../src/Shared/Exceptions/InvalidPositiveNumber");
const Id_1 = require("../../../../src/Shared/VOs/Id");
const PositiveNumber_1 = require("../../../../src/Shared/VOs/PositiveNumber");
const TestCouriersRepository_1 = require("../Infrastructure/TestCouriersRepository");
describe('Update courier available capacity', () => {
    let courierRepository;
    let updateCourierAvailableCapcity;
    beforeEach(() => {
        courierRepository = new TestCouriersRepository_1.TestCouriersRepository();
        updateCourierAvailableCapcity = new UpdateCourierAvailableCapcity_1.UpdateCourierAvailableCapcity(courierRepository);
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it(`
        GIVEN an exist courier 
        WHEN pickup a package for 10 capacity
        THEN save successfully
    `, async () => {
        let courierRepositoryFindMock = jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier_1.Courier.create(123, 45));
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });
        await updateCourierAvailableCapcity.run(123, 10, 0);
        expect(courierRepositoryFindMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 35 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 },
        });
    });
    it(`
        GIVEN an exist courier 
        WHEN delivery a package for 10 capacity
        THEN save successfully
    `, async () => {
        let courierRepositoryFindMock = jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => new Courier_1.Courier(new Id_1.Id(123), new PositiveNumber_1.PositiveNumber(25), new PositiveNumber_1.PositiveNumber(45)));
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });
        await updateCourierAvailableCapcity.run(123, 0, 10);
        expect(courierRepositoryFindMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 35 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 },
        });
    });
    it(`
        GIVEN a invalid pickup capacity 
        WHEN update capacity
        THEN throw invalid positive number error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, -10, 0);
        }, InvalidPositiveNumber_1.InvalidPositiveNumber);
    });
    it(`
        GIVEN a invalid delivery capacity 
        WHEN update capacity
        THEN throw invalid positive number error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 0, -10);
        }, InvalidPositiveNumber_1.InvalidPositiveNumber);
    });
    it(`
        GIVEN a non exist courier
        WHEN update capacity
        THEN throw courier not found error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 0, 0);
        }, CourierNotFound_1.CourierNotFound);
    });
    it(`
        GIVEN a exist courier
        AND pickup more capacity than can
        WHEN update capacity
        THEN throw courier can't exceed maximum capacity error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier_1.Courier.create(123, 45));
        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 50, 0);
        }, CourierCannotExceedMaximumCapacity_1.CourierCannotExceedMaximumCapacity);
    });
    it(`
        GIVEN a exist courier
        AND pickup more capacity than can
        WHEN update capacity
        THEN throw courier can't exceed maximum capacity error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier_1.Courier.create(123, 45));
        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 0, 10);
        }, CourierNotHavePackageToDelivery_1.CourierNotHavePackageToDelivery);
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
//# sourceMappingURL=UpdateCourierAvailableCapacity.test.js.map