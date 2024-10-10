import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("products").del();


    await knex("products").insert([
        {name: "Macarrão", price: "20" },
        {name: "Chop Suey", price: "37" },
        {name: "Carne com batatas", price: "91" },
        {name: "Tilapia ao molho de cereja", price: "55" },
        {name: "Salmão ao molho de solan", price: "120" },
        {name: "Carpaccio", price: "115" },
    ]);
};
