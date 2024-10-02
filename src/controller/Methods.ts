

import { Request, Response, NextFunction} from "express"
import knex from "knex"
import { z } from "zod"

export class ProductsControllers{

    async index(req: Request, res: Response, next: NextFunction){
            try {
                //const products = await knex<ProductRepository>("products").select()

                res.status(200).send("Listado")
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

            //await knex<ProductRepository>("products").insert({name, price})

            res.status(201).send(req.body)
        } catch (error) {
            next(error)
        }

    }

    async update(req: Request, res: Response, next: NextFunction){

        try { 

            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "É necessário ser um número"}).parse(req.params.id)
            
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0)
            })

            bodySchema.parse(req.body)

            res.status(200).send("Feito")
        } catch (error) {
            next(error)
        }

    }
}