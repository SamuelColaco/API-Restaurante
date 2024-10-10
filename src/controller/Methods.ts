

import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import { z } from "zod"

export class ProductsControllers{

    async index(req: Request, res: Response, next: NextFunction){
            try {
                const products = await knex<ProductRepository>("products").select()

                res.status(200).send(products)
            } catch (error) {
                next(error)
            }
    }

    async create(req : Request, res: Response, next: NextFunction){
        try {
            const { name, price } = req.body

           const bodySchema =  z.object({
                name: z.string({required_error: "Prescisa conter o nome"}).trim().min(6),
                price: z.number({required_error: "Prescisa ter um valor"}).gt(0)
            })

            bodySchema.parse(req.body)

            await knex<ProductRepository>("products").insert({name, price})

            res.status(201).json()
        } catch (error) {
            next(error)
        }

    }

    async update(req: Request, res: Response, next: NextFunction){

        try { 

            const { ...all} = req.body
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "É necessário ser um número"}).parse(req.params.id)
            
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0)
            })

            bodySchema.parse(req.body)

            await knex<ProductRepository>("products").update({ ...all, updated_at: knex.fn.now() }).where({ id })
            res.status(200).json()
        } catch (error) {
            next(error)
        }

    }

    async delete(req: Request, res: Response, next: NextFunction){
    try {

        const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "É necessário ser um número"}).parse(req.params.id)
        
        await knex<ProductRepository>("products").delete().where({ id })
        res.status(200).json()
    } catch (error) {
        next(error)
    }
    }
}