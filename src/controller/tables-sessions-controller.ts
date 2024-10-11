
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import z from "zod"

export class TablesSessions{
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const { tables_id } = req.body

            const bodySchema = z.object({
                tables_id: z.number().gt(0)
            })
            bodySchema.parse(req.body)
            
            await knex.raw('PRAGMA foreign_keys = ON');
            await knex<TablesSessionsTypes>("tables-sessions").insert({tables_id,opened_at: knex.fn.now() }) 
            
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }
}