
import {Request, Response, NextFunction } from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "../utils/AppError"
import { totalmem } from "os"
export class Orders{
    async index(req: Request, res: Response, next: NextFunction){
        try {
            const { table_sessions_id } = req.params

            const orders =   await knex("Pedidos")
            .select("Pedidos.id", "Pedidos.table_sessions_id", "Pedidos.products_id", "products.name","Pedidos.quantity", "Pedidos.price AS order_price")
            .join("products", "products.id", "Pedidos.products_id")
            .where({ table_sessions_id })
            
            res.status(200).json(orders.length === 0 ? 'Sem Pedidos': orders )
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

            const tableSessions = await knex<TablesSessionsTypes>("tables-sessions").where({ id: table_sessions_id}).first()

            const price = quantity * Number(priceProducts)

            if(!tableSessions){
                throw new AppError("Sessão não existe")
            }

            if(tableSessions.closed_at_time){
                throw new AppError("Sessão já foi fechada")
            }

            await knex<OrdersRepository>("Pedidos").insert({ quantity, table_sessions_id, products_id, price})
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async show(req: Request, res: Response, next: NextFunction){
        try {

            const { table_sessions_id } = req.params
            
            const array = await knex("Pedidos").where({ table_sessions_id }).pluck('price')
            let total = 0
            for(let i = 0; i < array.length; i++){
                total += Number(array[i])
            }
            res.status(200).json({ "total": total})
            
        } catch (error) {
            next(error)
        }
    }
    
}