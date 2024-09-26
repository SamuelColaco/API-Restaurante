

import { Request, Response, NextFunction} from "express"

export function MiddlewareChange(req: Request,res: Response, next:NextFunction){
    
    console.log("Passou pelo middleware")
    next()
}