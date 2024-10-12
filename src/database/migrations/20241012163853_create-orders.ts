import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Pedidos", (column) => {
        column.increments("id").primary(),
        column.integer("table_sessions_id").notNullable().references("id").inTable("tables-sessions"),
        column.integer("products_id").notNullable().references("id").inTable("products"),
        column.integer("quantity").notNullable(),
        column.decimal("price").notNullable(),
        column.timestamp("created_at").defaultTo(knex.fn.now()),
        column.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("Pedidos")
}

