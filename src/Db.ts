import {createConnection} from "typeorm";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";

export const connectToDb = async () => createConnection(<ConnectionOptions>{
    type: process.env.DB_TYPE,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
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
