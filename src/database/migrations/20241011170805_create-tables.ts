import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Mesas", (column) => {
        column.increments("id").primary(),
        column.integer("number").notNullable(),
        column.timestamp("created_at").defaultTo(knex.fn.now()),
        column.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("Mesas")
}

