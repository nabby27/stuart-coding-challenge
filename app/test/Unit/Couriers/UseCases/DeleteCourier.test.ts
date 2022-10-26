import { DeleteCourier } from "../../../../src/Couriers/Application/UseCases/DeleteCourier";
import { Courier } from "../../../../src/Couriers/Domain/Entities/Courier";
import { CantDeleteCourierIfIsDelivering } from "../../../../src/Couriers/Domain/Exceptions/CantDeleteCourierIfIsDelivering";
import { CourierNotFound } from "../../../../src/Couriers/Domain/Exceptions/CourierNotFound";
import { Id } from "../../../../src/Shared/VOs/Id";
import { PositiveNumber } from "../../../../src/Shared/VOs/PositiveNumber";
import { TestCouriersRepository } from "../Infrastructure/TestCouriersRepository";

describe('Delete courier', () => {

    let courierRepository: TestCouriersRepository;
    let deleteCourier: DeleteCourier;

    beforeEach(() => {
        courierRepository = new TestCouriersRepository();
        deleteCourier = new DeleteCourier(courierRepository);
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
            .mockImplementation(async () => Courier.create(123, 45));
        let courierRepositoryRemoveMock = jest.spyOn(courierRepository, 'remove')
            .mockImplementation(async () => { });

        await deleteCourier.run(123);

        expect(courierRepositoryFindMock).toBeCalledTimes(1)
        expect(courierRepositoryRemoveMock).toBeCalledTimes(1)
        expect(courierRepositoryRemoveMock).toBeCalledWith({
            _availableCapacity: { _value: 45 },
            _id: { _value: 123 },
            _maximumCapacity: { _value: 45 }
        })
    })

    it(`
        GIVEN a not exist courier id
        WHEN delete a courier
        THEN throw courier not found error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => null);

        assertThrowErrorAndNotDelete(async () => {
            await deleteCourier.run(123);
        }, CourierNotFound)
    })

    it(`
        GIVEN an exist courier id
        AND courier is delivering
        WHEN delete a courier
        THEN throw can't delete courier error
    `, async () => {
        jest.spyOn(courierRepository, 'find')
            .mockImplementation(async () => new Courier(
                new Id(123),
                new PositiveNumber(30),
                new PositiveNumber(45),
            ));

        assertThrowErrorAndNotDelete(async () => {
            await deleteCourier.run(123);
        }, CantDeleteCourierIfIsDelivering)
    })

    async function assertThrowErrorAndNotDelete<T>(action: () => Promise<void>, exception: T) {
        let courierRepositoryRemoveMock = jest.spyOn(courierRepository, 'remove')
            .mockImplementation(async () => { });

        expect.assertions(2)
        try {
            await action();
        } catch (error) {
            expect(error).toBeInstanceOf(exception);
        }

        expect(courierRepositoryRemoveMock).toBeCalledTimes(0)
    }
})