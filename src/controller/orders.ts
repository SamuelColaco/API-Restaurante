
//Importando dependencias
import {Request, Response, NextFunction } from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "../utils/AppError"

//Exportando classe de pedidos
export class Orders{
    //Criando função assincrona de listar os pedidos
    async index(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando o id da sessão da mesa dos parametros da url
            const { table_sessions_id } = req.params

            //Listando os pedidos correlacionados com o id da mesa passados
            const orders =   await knex("Pedidos")
            .select("Pedidos.id", "Pedidos.table_sessions_id", "Pedidos.products_id", "products.name","Pedidos.quantity", "Pedidos.price AS order_price")
            .join("products", "products.id", "Pedidos.products_id")
            .where({ table_sessions_id })

            //Caso haja pedidos retorna-os, caso não, a mensagem personalizada
            res.status(200).json(orders.length === 0 ? 'Sem Pedidos': orders )
        } catch (error) {
            next(error)
        }
    }

    //Criando função assincrona de criação de pedidos
    async create(req: Request, res: Response, next: NextFunction){
        try {
            //Pegando os parametros passados no corpo da requisição
            const { quantity, table_sessions_id, products_id } = req.body
            
            //Validando os parametros passados
            const bodySchema = z.object({
                quantity: z.number().gt(0),
                table_sessions_id: z.number().gt(0),
                products_id: z.number().gt(0)
            })

            //Parseando a validação com o corpo da requisição
            bodySchema.parse(req.body)
            //Garantindo que as chaves estrangeiras estão funcionando
            await knex.raw('PRAGMA foreign_keys = ON');
            //Pegando apenas o preço dos produtos 
            const priceProducts = (await knex<ProductRepository>("products").where({ id: products_id }).pluck('price'))

            //Pegando a sessão de mesa onde o produto foi chamado
            const tableSessions = await knex<TablesSessionsTypes>("tables-sessions").where({ id: table_sessions_id}).first()

            //Calculando o preço total do pedido em determinada mesa
            const price = quantity * Number(priceProducts)

            //Verificando se a sessão da mesa existe
            if(!tableSessions){
                throw new AppError("Sessão não existe")
            }

            //Verificando se a sessão da mesa já foi fechada
            if(tableSessions.closed_at_time){
                throw new AppError("Sessão já foi fechada")
            }

            //Inserindo os dados do pedido no banco de dados
            await knex<OrdersRepository>("Pedidos").insert({ quantity, table_sessions_id, products_id, price})

            //Retornando status 201 de criado
            res.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    //Criando função assincrona de mostrar os pedidos
    async show(req: Request, res: Response, next: NextFunction){
        try {

            //Pegando o id da sessão da mesa dos parametros da url
            const { table_sessions_id } = req.params
            
            //Pegando os pedidos de determinada sessão de mesa
            const array = await knex("Pedidos").where({ table_sessions_id }).pluck('price')
            let total = 0
            //Pegando o total dos pedidos de uma mesa
            for(let i = 0; i < array.length; i++){
                total += Number(array[i])
            }
            //Mostrando o status 200 de sucesso e o total dos pedidos
            res.status(200).json({ "total": total})
            
        } catch (error) {
            next(error)
        }
    }
    
}