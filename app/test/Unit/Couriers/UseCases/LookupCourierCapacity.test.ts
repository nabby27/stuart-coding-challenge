import { LookupCourierCapacity } from "../../../../src/Couriers/Application/UseCases/LookupCourierCapacity";
import { InvalidPositiveNumber } from "../../../../src/Shared/Exceptions/InvalidPositiveNumber";
import { TestCouriersRepository } from "../Infrastructure/TestCouriersRepository";

describe('Lookup courier', () => {

    let courierRepository: TestCouriersRepository;
    let lookupCourierCapacity: LookupCourierCapacity;

    beforeEach(() => {
        courierRepository = new TestCouriersRepository();
        lookupCourierCapacity = new LookupCourierCapacity(courierRepository);
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

        expect(courierRepositorySearchMock).toBeCalledTimes(1)
        expect(courierRepositorySearchMock).toBeCalledWith({ _value: 45 })
    })

    it(`
        GIVEN a invalid capacity required
        WHEN lookup for courier capacity
        THEN throw invalid positive number error
    `, async () => {
        let courierRepositorySearchMock = jest.spyOn(courierRepository, 'searchWithAvailableCapacity')
            .mockImplementation(async () => []);

        try {
            await lookupCourierCapacity.run(-45);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPositiveNumber)
        }

        expect(courierRepositorySearchMock).toBeCalledTimes(0)
    })
})