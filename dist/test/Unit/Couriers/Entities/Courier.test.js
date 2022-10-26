"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Courier_1 = require("../../../../src/Couriers/Domain/Entities/Courier");
const AvailableCapacityCantBeGreaterThanMaximumCapacity_1 = require("../../../../src/Couriers/Domain/Exceptions/AvailableCapacityCantBeGreaterThanMaximumCapacity");
const Id_1 = require("../../../../src/Shared/VOs/Id");
const PositiveNumber_1 = require("../../../../src/Shared/VOs/PositiveNumber");
describe('Courier', () => {
    it(`
        GIVEN an inconsistence courier
        WHEN reconstruct from database
        THEN throw error
    `, () => {
        expect.assertions(1);
        try {
            new Courier_1.Courier(new Id_1.Id(123), new PositiveNumber_1.PositiveNumber(55), new PositiveNumber_1.PositiveNumber(45));
        }
        catch (error) {
            expect(error).toBeInstanceOf(AvailableCapacityCantBeGreaterThanMaximumCapacity_1.AvailableCapacityCantBeGreaterThanMaximumCapacity);
        }
    });
    it(`
        GIVEN a valid courier
        WHEN transform to primitive
        THEN get primitive values
    `, () => {
        const courier = Courier_1.Courier.create(123, 45);
        const primitives = courier.toPrimitives();
        expect(primitives).toEqual({
            id: 123,
            availableCapacity: 45,
            maximumCapacity: 45
        });
    });
    it(`
        GIVEN a valid primitives for courier
        WHEN craete courier form primitives
        THEN return a courier with this values
    `, () => {
        const courier = Courier_1.Courier.fromPrimitives({
            id: 123,
            availableCapacity: 45,
            maximumCapacity: 45
        });
        expect(courier.id.value).toEqual(123);
        expect(courier.availableCapacity.value).toEqual(45);
        expect(courier.maximumCapacity.value).toEqual(45);
    });
});
//# sourceMappingURL=Courier.test.js.map