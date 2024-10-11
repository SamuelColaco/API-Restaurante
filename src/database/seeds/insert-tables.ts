import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("Mesas").del();

    await knex("Mesas").insert([
        { number: 3 },
        { number: 7 },
        { number: 9},
        { number: 48 },
        { number: 28 },
    ]);
};
