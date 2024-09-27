

import { Request, Response, NextFunction} from "express"

export class ProductsControllers{

    async index(req: Request, res: Response, next: NextFunction){
            try {
                res.status(200).send("Foi")
            } catch (error) {
                next(error)
            }
    }

    create(req : Request, res: Response){
        res.status(201).send("Foi mandado")

    }
}