
//Importando dependencias
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "../utils/AppError"

//Exportando classe de sessões das mesas
export class TablesSessions{

    //Criando funçao assincrona para listar as sessões existentes
    async index(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando as sessões de mesas existentes
            const tablesSessions = await knex<TablesSessionsTypes>("tables-sessions").select()
            //Mostrando o status 200 de sucesso e as sessões criadas
            res.status(200).json(tablesSessions)
        } catch (error) {
            next(error)
        }
    }
    //Criando função assincrona de criação de sessões de mesa
    async create(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando o id da mesa no corpo da requisição
            const { tables_id } = req.body
            //Validando o id da mesa passado
            const bodySchema = z.object({
                tables_id: z.number().gt(0)
            })
            //Parseando a validação no corpo da requisição
            bodySchema.parse(req.body)

            //Pegando a sessão de mesa caso exista.
            const tableSessionsExist = await knex<TablesSessionsTypes>("tables-sessions").where({ tables_id }).first()
            //Garantindo que as chaves estrangeiras estão funcionando
            await knex.raw('PRAGMA foreign_keys = ON');
            //Verificando se a sessão já existe ou não
            if(tableSessionsExist === undefined){
                //Caso não exista, crie uma e adicione no banco de dados
                await knex<TablesSessionsTypes>("tables-sessions").insert({tables_id,opened_at: knex.fn.now() }) 
            }
            else{
                //Caso existe mostra mensagem de erro personalizada
                throw new AppError("Essa sessão já existe")
            }
            //Retornando diagnostico de status 201 de criado
            res.status(201).json()
        } catch (error) {
            next(error)
        }

    }

    //Criando função assincrona de atualizar a sessão da mesa
    async update(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando e validando id passado na url
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value)).parse(req.params.id)
            //Pegando a sessão caso exista
            const sessions = await knex<TablesSessionsTypes>("tables-sessions").where({ id }).first()

            //Verificando se a sessão existe
            if(!sessions){
                //Caso não exista mostra mensagem personalizada
                throw new AppError("Essa sessão não existe")
            }

            //Veificando se a sessão já foi fechada
            if(sessions.closed_at_time){
                //Caso tenha sido fechada, mostra mensagem personalizada
                throw new AppError("Sessão já foi fechada")
            }
            //Esperando e atualizando a sessão com o id passado na url
            await knex<TablesSessionsTypes>("tables-sessions").update({ closed_at_time: knex.fn.now()}).where({ id })
            //Retornando diagnostico de status 200 de sucesso
            res.status(200).json()
        } catch (error) {
            next(error)
        }
    }

}