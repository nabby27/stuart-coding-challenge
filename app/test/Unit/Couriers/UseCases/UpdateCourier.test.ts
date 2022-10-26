import { UpdateCourier } from "../../../../src/Couriers/Application/UseCases/UpdateCourier";
import { Courier } from "../../../../src/Couriers/Domain/Entities/Courier";
import { CourierNotFound } from "../../../../src/Couriers/Domain/Exceptions/CourierNotFound";
import { CantUpdateMaximumCapacityIfCourierIsDelivering } from "../../../../src/Couriers/Domain/Exceptions/CantUpdateMaximumCapacityIfCourierIsDelivering";
import { Id } from "../../../../src/Shared/VOs/Id";
import { PositiveNumber } from "../../../../src/Shared/VOs/PositiveNumber";
import { TestCouriersRepository } from "../Infrastructure/TestCouriersRepository";

describe('Update courier', () => {

    let courierRepository: TestCouriersRepository;
    let updateCourier: UpdateCourier;

    beforeEach(() => {
        courierRepository = new TestCouriersRepository();
        updateCourier = new UpdateCourier(courierRepository);
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
            .mockImplementation(async () => Courier.create(123, 45));
        let courierRepositorySaveMock = jest.spyOn(courierRepository, 'save')
            .mockImplementation(async () => { });

        await updateCourier.run(123, 50);

        expect(courierRepositoryFindMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledTimes(1)
        expect(courierRepositorySaveMock).toBeCalledWith({
            _availableCapacity: { _value: 50 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 50 },
        })
    })

    it(`
        GIVEN a non exist courier
        WHEN update courier
        THEN throw courier not found error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);

        assertThrowErrorAndNotSave(async () => {
            await updateCourier.run(123, 50);
        }, CourierNotFound)
    })

    it(`
        GIVEN an exist courier
        AND a valid maximum capacity
        AND is delivering
        WHEN update courier
        THEN throw cant update error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => new Courier(
                new Id(123),
                new PositiveNumber(20),
                new PositiveNumber(45)
            ));

        assertThrowErrorAndNotSave(async () => {
            await updateCourier.run(123, 50);
        }, CantUpdateMaximumCapacityIfCourierIsDelivering)
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