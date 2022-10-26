import { DataSource } from "typeorm"
import { CourierSchemaTypeORM } from "../../Couriers/Infrastructure/Repositories/TypeORM/CourierSchema"
import dotenv from 'dotenv'

dotenv.config();

const TypeORMDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    entities: [CourierSchemaTypeORM],
    synchronize: true,
})

TypeORMDataSource.initialize()

export { TypeORMDataSource }
