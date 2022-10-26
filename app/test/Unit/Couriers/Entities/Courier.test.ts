import { Courier } from "../../../../src/Couriers/Domain/Entities/Courier"
import { AvailableCapacityCantBeGreaterThanMaximumCapacity } from "../../../../src/Couriers/Domain/Exceptions/AvailableCapacityCantBeGreaterThanMaximumCapacity"
import { Id } from "../../../../src/Shared/VOs/Id"
import { PositiveNumber } from "../../../../src/Shared/VOs/PositiveNumber"

describe('Courier', () => {

    it(`
        GIVEN an inconsistence courier
        WHEN reconstruct from database
        THEN throw error
    `, () => {
        expect.assertions(1)
        try {
            new Courier(
                new Id(123),
                new PositiveNumber(55),
                new PositiveNumber(45),
            )
        } catch (error) {
            expect(error).toBeInstanceOf(AvailableCapacityCantBeGreaterThanMaximumCapacity)
        }
    })

    it(`
        GIVEN a valid courier
        WHEN transform to primitive
        THEN get primitive values
    `, () => {
        const courier = Courier.create(123, 45)

        const primitives = courier.toPrimitives()

        expect(primitives).toEqual({
            id: 123,
            availableCapacity: 45,
            maximumCapacity: 45
        })
    })

    it(`
        GIVEN a valid primitives for courier
        WHEN craete courier form primitives
        THEN return a courier with this values
    `, () => {
        const courier = Courier.fromPrimitives({
            id: 123,
            availableCapacity: 45,
            maximumCapacity: 45
        })

        expect(courier.id.value).toEqual(123)
        expect(courier.availableCapacity.value).toEqual(45)
        expect(courier.maximumCapacity.value).toEqual(45)
    })
})