

import { Request, Response } from "express"

export class ProductsControllers{

    async index(req: Request, res: Response){
        res.status(200).send("Foi")
    }

    create(req : Request, res: Response){
        res.status(201).send("Foi mandado")
    }
}