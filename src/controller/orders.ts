
import {Request, Response, NextFunction } from "express"
import { knex } from "../database/knex"
import z from "zod"
export class Orders{
    async index(req: Request, res: Response, next: NextFunction){
        try {
            
            const orders =   await knex<OrdersRepository>("Pedidos").select()
            
            res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const { quantity, table_sessions_id, products_id } = req.body
            
            const bodySchema = z.object({
                quantity: z.number().gt(0),
                table_sessions_id: z.number().gt(0),
                products_id: z.number().gt(0)
            })

            bodySchema.parse(req.body)
            await knex.raw('PRAGMA foreign_keys = ON');
            const priceProducts = (await knex<ProductRepository>("products").where({ id: products_id }).pluck('price'))

            const price = quantity * Number(priceProducts)
            console.log(price)
            await knex<OrdersRepository>("Pedidos").insert({ quantity, table_sessions_id, products_id, price})
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }
    
}