import { Response } from 'express';
import { AvailableCapacityCantBeGreaterThanMaximumCapacity } from '../../Couriers/Domain/Exceptions/AvailableCapacityCantBeGreaterThanMaximumCapacity';
import { CantDeleteCourierIfIsDelivering } from '../../Couriers/Domain/Exceptions/CantDeleteCourierIfIsDelivering';
import { CantUpdateMaximumCapacityIfCourierIsDelivering } from '../../Couriers/Domain/Exceptions/CantUpdateMaximumCapacityIfCourierIsDelivering';
import { CourierAlreadyExists } from '../../Couriers/Domain/Exceptions/CourierAlreadyExists';
import { CourierCannotExceedMaximumCapacity } from '../../Couriers/Domain/Exceptions/CourierCannotExceedMaximumCapacity';
import { CourierNotFound } from '../../Couriers/Domain/Exceptions/CourierNotFound';
import { CourierNotHavePackageToDelivery } from '../../Couriers/Domain/Exceptions/CourierNotHavePackageToDelivery';
import { BaseException } from '../Exceptions/BaseException';
import { InvalidPositiveNumber } from '../Exceptions/InvalidPositiveNumber';

export const exceptionHandler = (error: Error, res: Response): void => {
    if (error instanceof BaseException) {
        const httpCode = domainCodeToHttpCode(error);

        res.status(httpCode).json({
            error: error.message,
            errorType: error.constructor.name,
            data: error.data,
        });
    } else {
        res.status(500).json({
            error: 'Unknown error',
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
    }
};

const domainCodeToHttpCode = (exception: BaseException) => {
    switch (exception.constructor) {
        case AvailableCapacityCantBeGreaterThanMaximumCapacity:
        case CantDeleteCourierIfIsDelivering:
        case CantUpdateMaximumCapacityIfCourierIsDelivering:
        case CourierCannotExceedMaximumCapacity:
        case CourierNotHavePackageToDelivery:
        case InvalidPositiveNumber:
            return 400;

        case CourierNotFound:
            return 404;

        case CourierAlreadyExists:
            return 409;

        default:
            return 500;
    }
};
