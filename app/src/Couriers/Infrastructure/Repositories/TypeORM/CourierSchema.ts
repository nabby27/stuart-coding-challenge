import { Primitives } from "@codelytv/primitives-type";
import { EntitySchema } from "typeorm";
import { Courier } from "../../../Domain/Entities/Courier";

export const CourierSchemaTypeORM = new EntitySchema<Primitives<Courier>>({
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
