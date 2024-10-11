
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "../utils/AppError"

export class TablesController{
    async index(req: Request, res: Response, next: NextFunction){
        try {

            const tables = await knex<TableRepository>("Mesas").select()
            res.status(200).send(tables)
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const { number } = req.body

            const bodySchema = z.object({
                number: z.number().gt(0)
            })

            bodySchema.parse(req.body)
            const numberExist = await knex<TableRepository>("Mesas").where({ number }).first()
            if(numberExist === undefined){
                await knex<TableRepository>("Mesas").insert({ number })
            }
            else{
                throw new AppError("Esse número de mesa já existe")
            }

            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {
            const { number } = req.body
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value)).parse(req.params.id)

            const bodySchema = z.object({
                number: z.number().gt(0)
            })

            bodySchema.parse(req.body)
            await knex<TableRepository>("Mesas").update({ number, updated_at: knex.fn.now()}).where({ id })

            res.status(200).json()
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
        const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value)).parse(req.params.id)

        await knex<TableRepository>("Mesas").delete().where({ id })
        res.status(200).json()


        
        } catch (error) {
            next(error)
        }
    }
}