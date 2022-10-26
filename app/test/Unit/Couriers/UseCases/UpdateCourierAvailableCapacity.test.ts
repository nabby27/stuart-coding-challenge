import { UpdateCourierAvailableCapcity } from "../../../../src/Couriers/Application/UseCases/UpdateCourierAvailableCapcity";
import { Courier } from "../../../../src/Couriers/Domain/Entities/Courier";
import { CourierCannotExceedMaximumCapacity } from "../../../../src/Couriers/Domain/Exceptions/CourierCannotExceedMaximumCapacity";
import { CourierNotFound } from "../../../../src/Couriers/Domain/Exceptions/CourierNotFound";
import { CourierNotHavePackageToDelivery } from "../../../../src/Couriers/Domain/Exceptions/CourierNotHavePackageToDelivery";
import { InvalidPositiveNumber } from "../../../../src/Shared/Exceptions/InvalidPositiveNumber";
import { Id } from "../../../../src/Shared/VOs/Id";
import { PositiveNumber } from "../../../../src/Shared/VOs/PositiveNumber";
import { TestCouriersRepository } from "../Infrastructure/TestCouriersRepository";

describe('Update courier available capacity', () => {

    let courierRepository: TestCouriersRepository;
    let updateCourierAvailableCapcity: UpdateCourierAvailableCapcity;

    beforeEach(() => {
        courierRepository = new TestCouriersRepository();
        updateCourierAvailableCapcity = new UpdateCourierAvailableCapcity(courierRepository);
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
            .mockImplementation(async () => Courier.create(123, 45));
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });

        await updateCourierAvailableCapcity.run(123, 10, 0);

        expect(courierRepositoryFindMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 35 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 },
        })
    })

    it(`
        GIVEN an exist courier 
        WHEN delivery a package for 10 capacity
        THEN save successfully
    `, async () => {
        let courierRepositoryFindMock = jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => new Courier(
                new Id(123),
                new PositiveNumber(25),
                new PositiveNumber(45),
            ));
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });

        await updateCourierAvailableCapcity.run(123, 0, 10);

        expect(courierRepositoryFindMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 35 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 },
        })
    })

    it(`
        GIVEN a invalid pickup capacity 
        WHEN update capacity
        THEN throw invalid positive number error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);

        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, -10, 0);
        }, InvalidPositiveNumber)
    })

    it(`
        GIVEN a invalid delivery capacity 
        WHEN update capacity
        THEN throw invalid positive number error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);

        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 0, -10);
        }, InvalidPositiveNumber)
    })

    it(`
        GIVEN a non exist courier
        WHEN update capacity
        THEN throw courier not found error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);

        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 0, 0);
        }, CourierNotFound)
    })

    it(`
        GIVEN a exist courier
        AND pickup more capacity than can
        WHEN update capacity
        THEN throw courier can't exceed maximum capacity error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier.create(123, 45));

        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 50, 0);
        }, CourierCannotExceedMaximumCapacity)
    })

    it(`
        GIVEN a exist courier
        AND pickup more capacity than can
        WHEN update capacity
        THEN throw courier can't exceed maximum capacity error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => Courier.create(123, 45));

        assertThrowErrorAndNotSave(async () => {
            await updateCourierAvailableCapcity.run(123, 0, 10);
        }, CourierNotHavePackageToDelivery)
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