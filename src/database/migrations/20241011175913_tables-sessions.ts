import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tables-sessions", (column) => {
        column.increments("id").primary(),
        column.integer("tables_id").notNullable().references("id").inTable("Mesas"),
        column.timestamp("opened_at").defaultTo(knex.fn.now())
        column.time("closed_at_time")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tables-sessions")
}

