import {createConnection} from "typeorm";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";

export const connectToDb = async () => createConnection(<ConnectionOptions>{
    type: process.env.DB_TYPE || "postgres",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER_NAME || "postgres",
    password: process.env.DB_USER_PASSWORD || "example",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    // migrationsTableName: "custom_migration_table",
    entities: [
        __dirname + '/entities/**/*.{ts,js}'
    ],
    migrations: [
        __dirname + '/migrations/**/*.{ts,js}'
    ],
    cli: {
        entitiesDir: __dirname + "/entities/",
        migrationsDir: __dirname + '/migrations/'
    }
});
