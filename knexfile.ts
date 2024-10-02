


export default {
    client: "sqlite3",
    connection: {
        filename: "./src/database/database.db",
    },
    userNullAsDefault: true,
    migrations: {
        extensions: "ts",
        directory: "./src/database/migrations"
    },
    seeds: {
        extensions: "ts",
        directory: "./src/database/seeds"
    },
}

/*
import { Knex } from "knex"

const config : {[key: string]: Knex.Config} = {
    development : {
        client: "sqlite3",
        connection: {
            filename: "./src/database/database.db",
            },
            
        useNullAsDefault: true,
        migrations: {
            extension: "ts",
            directory: "./src/database/migrations",
        },
    
        seeds: {
            extension: "ts",
            directory: "./src/database/seeds" ,
        },
    },

}

export default config
*/