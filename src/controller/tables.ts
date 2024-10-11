
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"

export class TablesController{
    async index(req: Request, res: Response, next: NextFunction){
        try {

            const tables = await knex<TableRepository>("tables").select()
            res.status(200).send(tables)
        } catch (error) {
            next(error)
        }
    }
}