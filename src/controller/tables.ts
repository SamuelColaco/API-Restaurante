
//Importando dependencias
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "../utils/AppError"

//Exportando classe de controller das mesas
export class TablesController{

    //Criando função de listar mesas existentes
    async index(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando as mesas existentes
            const tables = await knex<TableRepository>("Mesas").select()
            //Retornando status 200 de sucesso e as mesas existentes
            res.status(200).send(tables)
        } catch (error) {
            next(error)
        }
    }
    //Criando função de criação de mesas
    async create(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando o numero da mesa passado no corpo da requisição
            const { number } = req.body
            //Validando o numero passado
            const bodySchema = z.object({
                number: z.number().gt(0)
            })
            //Parseando a validação no corpo da requisição
            bodySchema.parse(req.body)
            //Pegando o numero da mesa, caso tenha
            const numberExist = await knex<TableRepository>("Mesas").where({ number }).first()
            //Verificando se o numero existe
            if(numberExist === undefined){
                //Caso não exista crie-o
                await knex<TableRepository>("Mesas").insert({ number })
            }
            else{
                //Caso existe mostra mensagem de erro personalizada
                throw new AppError("Esse número de mesa já existe")
            }
            //Retorna status 201 de criado
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    //Cria função assincrona de atualização
    async update(req: Request, res: Response, next: NextFunction){
        try {
            //Pega o numero da mesa no corpo da requisição
            const { number } = req.body
            //Pega e valida o id passado na url
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value)).parse(req.params.id)

            //Valida o numero da mesa
            const bodySchema = z.object({
                number: z.number().gt(0)
            })

            //Parseando a validação no corpo da requisição
            bodySchema.parse(req.body)
            //Esperando e atualizando a mesa do respectivo id passado 
            await knex<TableRepository>("Mesas").update({ number, updated_at: knex.fn.now()}).where({ id })
            //Retornando status 200 de sucesso
            res.status(200).json()
        } catch (error) {
            next(error)
        }
    }
    //Criando função assincrona de deletar
    async delete(req: Request, res: Response, next: NextFunction){
        try {
        //Pegando e validando id passado nos parametros da url
        const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value)).parse(req.params.id)
        
        //Deletando mesa do banco de dados, com o respectivo id passado
        await knex<TableRepository>("Mesas").delete().where({ id })
        //Retornando diagnostico de status 200 de sucesso
        res.status(200).json()



        } catch (error) {
            next(error)
        }
    }
}