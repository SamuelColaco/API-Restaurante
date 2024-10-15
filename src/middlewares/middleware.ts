
//Importando dependencias
import { Request, Response, NextFunction} from "express"
import { AppError } from "../utils/AppError"
import {  ZodError } from "zod"

//Exportando função de validação dos erros
export function errorHandling(error: any, req: Request,res: Response,next:NextFunction){
    
    //Verificando se o erro é do tipo AppError criado em utils/AppError.ts
    if(error instanceof AppError){
        //Retornando uma mensagem personalizada e seu status
        return res.status(error.statusCode).json({message: error.message})
    }
    //Verificando se o erro é do tipo ZodError(Erro gerado pela verificação do Zod)
    if(error instanceof ZodError){
        //Retornando mensagem personalizada
        return res.status(400).json({message: "Erro de validação", issues: error.format()})
    }
    //Retornando status 500 caso não seja um dos tipos anteriores
    return res.status(500).json({message: error.message})
}