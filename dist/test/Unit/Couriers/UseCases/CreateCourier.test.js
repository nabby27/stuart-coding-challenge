"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCourier_1 = require("../../../../src/Couriers/Application/UseCases/CreateCourier");
const Courier_1 = require("../../../../src/Couriers/Domain/Entities/Courier");
const CourierAlreadyExists_1 = require("../../../../src/Couriers/Domain/Exceptions/CourierAlreadyExists");
const InvalidPositiveNumber_1 = require("../../../../src/Shared/Exceptions/InvalidPositiveNumber");
const TestCouriersRepository_1 = require("../Infrastructure/TestCouriersRepository");
describe('Create courier', () => {
    let courierRepository;
    let createCourier;
    beforeEach(() => {
        courierRepository = new TestCouriersRepository_1.TestCouriersRepository();
        createCourier = new CreateCourier_1.CreateCourier(courierRepository);
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it(`
        GIVEN valid courier data
        WHEN create a courier
        THEN save on repository successfully
    `, async () => {
        let courierRepositoryFindMock = jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });
        await createCourier.run({ id: 123, maxCapacity: 45 });
        expect(courierRepositoryFindMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledTimes(1);
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 45 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 }
        });
    });
    it(`
        GIVEN a exist courier data
        WHEN create a courier
        THEN throw courier already exists error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier_1.Courier.create(123, 45));
        assertThrowErrorAndNotSave(async () => {
            await createCourier.run({ id: 123, maxCapacity: 45 });
        }, CourierAlreadyExists_1.CourierAlreadyExists);
    });
    it(`
        GIVEN courier data with invalid maximum capacity
        WHEN create a courier
        THEN throw invalid positive number error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);
        assertThrowErrorAndNotSave(async () => {
            await createCourier.run({ id: 123, maxCapacity: -45 });
        }, InvalidPositiveNumber_1.InvalidPositiveNumber);
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
//# sourceMappingURL=CreateCourier.test.js.map