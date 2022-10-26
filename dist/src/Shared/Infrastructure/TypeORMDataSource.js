"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMDataSource = void 0;
const typeorm_1 = require("typeorm");
const CourierSchema_1 = require("../../Couriers/Infrastructure/Repositories/TypeORM/CourierSchema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TypeORMDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [CourierSchema_1.CourierSchemaTypeORM],
    synchronize: true,
});
exports.TypeORMDataSource = TypeORMDataSource;
TypeORMDataSource.initialize();
//# sourceMappingURL=TypeORMDataSource.js.map