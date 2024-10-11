
import { Request, Response, NextFunction} from "express"

export class TablesSessions{
    async create(req: Request, res: Response, next: NextFunction){
        try {
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }
}