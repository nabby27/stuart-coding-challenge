import { InvalidPositiveNumber } from "../../../../src/Shared/Exceptions/InvalidPositiveNumber"

describe('Base exception', () => {

    it(`
        GIVEN an instance of BaseException
        WHEN get data
        THEN return data
    `, () => {
        const exception = new InvalidPositiveNumber(1)

        const data = exception.data

        expect(data).toEqual({
            value: 1
        })
    })

    it(`
        GIVEN an instance of BaseException
        WHEN get message
        THEN return message
    `, () => {
        const exception = new InvalidPositiveNumber(1)

        const message = exception.message

        expect(message).toEqual('Number must be positive')
    })
})