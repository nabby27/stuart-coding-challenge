"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const AvailableCapacityCantBeGreaterThanMaximumCapacity_1 = require("../../Couriers/Domain/Exceptions/AvailableCapacityCantBeGreaterThanMaximumCapacity");
const CantDeleteCourierIfIsDelivering_1 = require("../../Couriers/Domain/Exceptions/CantDeleteCourierIfIsDelivering");
const CantUpdateMaximumCapacityIfCourierIsDelivering_1 = require("../../Couriers/Domain/Exceptions/CantUpdateMaximumCapacityIfCourierIsDelivering");
const CourierAlreadyExists_1 = require("../../Couriers/Domain/Exceptions/CourierAlreadyExists");
const CourierCannotExceedMaximumCapacity_1 = require("../../Couriers/Domain/Exceptions/CourierCannotExceedMaximumCapacity");
const CourierNotFound_1 = require("../../Couriers/Domain/Exceptions/CourierNotFound");
const CourierNotHavePackageToDelivery_1 = require("../../Couriers/Domain/Exceptions/CourierNotHavePackageToDelivery");
const BaseException_1 = require("../Exceptions/BaseException");
const InvalidPositiveNumber_1 = require("../Exceptions/InvalidPositiveNumber");
const exceptionHandler = (error, res) => {
    if (error instanceof BaseException_1.BaseException) {
        const httpCode = domainCodeToHttpCode(error);
        res.status(httpCode).json({
            error: error.message,
            errorType: error.constructor.name,
            data: error.data,
        });
    }
    else {
        res.status(500).json({
            error: 'Unknown error',
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
    }
};
exports.exceptionHandler = exceptionHandler;
const domainCodeToHttpCode = (exception) => {
    switch (exception.constructor) {
        case AvailableCapacityCantBeGreaterThanMaximumCapacity_1.AvailableCapacityCantBeGreaterThanMaximumCapacity:
        case CantDeleteCourierIfIsDelivering_1.CantDeleteCourierIfIsDelivering:
        case CantUpdateMaximumCapacityIfCourierIsDelivering_1.CantUpdateMaximumCapacityIfCourierIsDelivering:
        case CourierCannotExceedMaximumCapacity_1.CourierCannotExceedMaximumCapacity:
        case CourierNotHavePackageToDelivery_1.CourierNotHavePackageToDelivery:
        case InvalidPositiveNumber_1.InvalidPositiveNumber:
            return 400;
        case CourierNotFound_1.CourierNotFound:
            return 404;
        case CourierAlreadyExists_1.CourierAlreadyExists:
            return 409;
        default:
            return 500;
    }
};
//# sourceMappingURL=exceptionHandler.js.map