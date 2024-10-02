

import { Request, Response, NextFunction} from "express"
import knex from "knex"
import { z } from "zod"

export class ProductsControllers{

    async index(req: Request, res: Response, next: NextFunction){
            try {
                res.status(200).send("Foi")
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

            res.status(201).send(req.body)
        } catch (error) {
            next(error)
        }

    }
}