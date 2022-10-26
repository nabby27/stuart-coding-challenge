"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApi = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CreateCourierController_1 = require("./Couriers/Infrastructure/Controllers/CreateCourierController");
const LookupCourierCapacityController_1 = require("./Couriers/Infrastructure/Controllers/LookupCourierCapacityController");
const exceptionHandler_1 = require("./Shared/Infrastructure/exceptionHandler");
const UpdateCourierAvailableCapcityController_1 = require("./Couriers/Infrastructure/Controllers/UpdateCourierAvailableCapcityController");
const UpdateCourierController_1 = require("./Couriers/Infrastructure/Controllers/UpdateCourierController");
const DeleteCourierController_1 = require("./Couriers/Infrastructure/Controllers/DeleteCourierController");
class RestApi {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this._api = (0, express_1.default)();
        this._server = null;
        this.addMiddlewares(this._api);
        this.addRoutes(this._api);
        this.addExceptionHandler(this._api);
    }
    start() {
        this._server = this._api.listen(this.PORT, () => {
            console.log(`Api start at port: ${this.PORT}`);
        });
    }
    stop() {
        var _a;
        (_a = this._server) === null || _a === void 0 ? void 0 : _a.close();
    }
    addMiddlewares(api) {
        api.use(express_1.default.json());
        api.use((0, cors_1.default)());
    }
    addRoutes(api) {
        api.post("/couriers", (0, express_async_handler_1.default)(async (req, res) => new CreateCourierController_1.CreateCourierController().run(req, res)));
        api.delete("/couriers/:courierId", (0, express_async_handler_1.default)(async (req, res) => new DeleteCourierController_1.DeleteCourierController().run(req, res)));
        api.put("/couriers/:courierId", (0, express_async_handler_1.default)(async (req, res) => new UpdateCourierController_1.UpdateCourierController().run(req, res)));
        api.get("/couriers/lookup", (0, express_async_handler_1.default)(async (req, res) => new LookupCourierCapacityController_1.LookupCourierCapacityController().run(req, res)));
        api.patch("/couriers/:courierId/availableCapacity", (0, express_async_handler_1.default)(async (req, res) => new UpdateCourierAvailableCapcityController_1.UpdateCourierAvailableCapcityController().run(req, res)));
    }
    addExceptionHandler(api) {
        api.use((error, req, res, next) => {
            (0, exceptionHandler_1.exceptionHandler)(error, res);
            next();
        });
    }
}
exports.RestApi = RestApi;
//# sourceMappingURL=RestApi.js.map