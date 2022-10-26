"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LookupCourierCapacity_1 = require("../../../../src/Couriers/Application/UseCases/LookupCourierCapacity");
const InvalidPositiveNumber_1 = require("../../../../src/Shared/Exceptions/InvalidPositiveNumber");
const TestCouriersRepository_1 = require("../Infrastructure/TestCouriersRepository");
describe('Lookup courier', () => {
    let courierRepository;
    let lookupCourierCapacity;
    beforeEach(() => {
        courierRepository = new TestCouriersRepository_1.TestCouriersRepository();
        lookupCourierCapacity = new LookupCourierCapacity_1.LookupCourierCapacity(courierRepository);
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it(`
        GIVEN a valid capacity required
        WHEN lookup for courier capacity
        THEN get array of couriers
    `, async () => {
        let courierRepositorySearchMock = jest.spyOn(courierRepository, 'searchWithAvailableCapacity')
            .mockImplementation(async () => []);
        await lookupCourierCapacity.run(45);
        expect(courierRepositorySearchMock).toBeCalledTimes(1);
        expect(courierRepositorySearchMock).toBeCalledWith({ _value: 45 });
    });
    it(`
        GIVEN a invalid capacity required
        WHEN lookup for courier capacity
        THEN throw invalid positive number error
    `, async () => {
        let courierRepositorySearchMock = jest.spyOn(courierRepository, 'searchWithAvailableCapacity')
            .mockImplementation(async () => []);
        try {
            await lookupCourierCapacity.run(-45);
        }
        catch (error) {
            expect(error).toBeInstanceOf(InvalidPositiveNumber_1.InvalidPositiveNumber);
        }
        expect(courierRepositorySearchMock).toBeCalledTimes(0);
    });
});
//# sourceMappingURL=LookupCourierCapacity.test.js.map