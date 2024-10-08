
import { Request, Response, NextFunction} from "express"
import knex from "knex"

export class TablesController{
    async index(req: Request, res: Response, next: NextFunction){
        try {

            //const tables = await knex<TableRepository>("tables").select()
            res.status(200).send("É mesas")
        } catch (error) {
            next(error)
        }
    }
}