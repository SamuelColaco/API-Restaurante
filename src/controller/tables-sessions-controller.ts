
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "../utils/AppError"

export class TablesSessions{
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const { tables_id } = req.body

            const bodySchema = z.object({
                tables_id: z.number().gt(0)
            })
            bodySchema.parse(req.body)
            const tableSessionsExist = await knex<TablesSessionsTypes>("tables-sessions").where({ tables_id }).first()
            
            await knex.raw('PRAGMA foreign_keys = ON');
            if(tableSessionsExist === undefined){
                await knex<TablesSessionsTypes>("tables-sessions").insert({tables_id,opened_at: knex.fn.now() }) 
            }
            else{
                throw new AppError("Essa sessão já existe")
            }
            
            res.status(201).json()
        } catch (error) {
            next(error)
        }


        
    }
}