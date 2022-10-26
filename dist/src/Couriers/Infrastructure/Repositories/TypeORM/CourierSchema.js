"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierSchemaTypeORM = void 0;
const typeorm_1 = require("typeorm");
exports.CourierSchemaTypeORM = new typeorm_1.EntitySchema({
    name: "couriers",
    tableName: 'couriers',
    columns: {
        id: {
            type: Number,
            primary: true
        },
        availableCapacity: {
            type: Number,
        },
        maximumCapacity: {
            type: Number,
        },
    },
    uniques: [
        {
            columns: ["id"],
        },
    ],
});
//# sourceMappingURL=CourierSchema.js.map