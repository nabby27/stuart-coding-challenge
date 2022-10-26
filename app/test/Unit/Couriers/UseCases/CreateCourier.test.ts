import { CreateCourier } from "../../../../src/Couriers/Application/UseCases/CreateCourier";
import { Courier } from "../../../../src/Couriers/Domain/Entities/Courier";
import { CourierAlreadyExists } from "../../../../src/Couriers/Domain/Exceptions/CourierAlreadyExists";
import { InvalidPositiveNumber } from "../../../../src/Shared/Exceptions/InvalidPositiveNumber";
import { TestCouriersRepository } from "../Infrastructure/TestCouriersRepository";

describe('Create courier', () => {

    let courierRepository: TestCouriersRepository;
    let createCourier: CreateCourier;

    beforeEach(() => {
        courierRepository = new TestCouriersRepository();
        createCourier = new CreateCourier(courierRepository);
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

        expect(courierRepositoryFindMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 45 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 }
        })
    })

    it(`
        GIVEN a exist courier data
        WHEN create a courier
        THEN throw courier already exists error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier.create(123, 45));

        assertThrowErrorAndNotSave(async () => {
            await createCourier.run({ id: 123, maxCapacity: 45 });
        }, CourierAlreadyExists)
    })

    it(`
        GIVEN courier data with invalid maximum capacity
        WHEN create a courier
        THEN throw invalid positive number error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);

        assertThrowErrorAndNotSave(async () => {
            await createCourier.run({ id: 123, maxCapacity: -45 });
        }, InvalidPositiveNumber)
    })

    async function assertThrowErrorAndNotSave<T>(action: () => Promise<void>, exception: T) {
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });

        expect.assertions(2)
        try {
            await action();
        } catch (error) {
            expect(error).toBeInstanceOf(exception);
        }

        expect(courierRepositorySaveMock).toBeCalledTimes(0)
    }

})