
//Importando dependencias
import { Request, Response, NextFunction} from "express"
import { knex } from "../database/knex"
import { z } from "zod"

//Exportando a classe dos controllers dos produtos
export class ProductsControllers{

    //Criando uma função assincrona de listagem dos produtos
    async index(req: Request, res: Response, next: NextFunction){
            try {
                //Pegando todos os produtos no banco de dados e guardando na constante
                const products = await knex<ProductRepository>("products").select()

                //Exibindo os produtos listados
                res.status(200).send(products)
            } catch (error) {
                next(error)
            }
    }


    //Criando uma função assincrona de criar produtos
    async create(req : Request, res: Response, next: NextFunction){
        try {
            //Desetruturando e pegando, name e price do corpo da requisição
            const { name, price } = req.body

            //Validando name e price e passando erro caso não esteja correto
           const bodySchema =  z.object({
                name: z.string({required_error: "Prescisa conter o nome"}).trim().min(6),
                price: z.number({required_error: "Prescisa ter um valor"}).gt(0)
            })

            //Parseando a validação pelo corpo da requisição
            bodySchema.parse(req.body)

            //Esperando o banco de dados, e inserindo o name e price nele
            await knex<ProductRepository>("products").insert({name, price})

            //Mostrando status 201 de criado
            res.status(201).json()
        } catch (error) {
            next(error)
        }

    }

    //Criando função assincrona de atualização de produtos
    async update(req: Request, res: Response, next: NextFunction){

        try { 

            //Pegando tudo que for passado no corpo da requisição
            const { ...all} = req.body
            //Pegando e validando o id passado como parametro na url
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "É necessário ser um número"}).parse(req.params.id)
            
            //Validando o name e price
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0)
            })

            //Parseando a validação no corpo da requisição
            bodySchema.parse(req.body)

            //Atualizando os dados passados de acordo com o id escrito na url
            await knex<ProductRepository>("products").update({ ...all, updated_at: knex.fn.now() }).where({ id })

            //Passando status 200 de sucesso
            res.status(200).json()
        } catch (error) {
            next(error)
        }

    }

    //Criando função assincrona de deletar produtos
    async delete(req: Request, res: Response, next: NextFunction){
    try {
        //Pegando e validando o id passado na url
        const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "É necessário ser um número"}).parse(req.params.id)

        //Deletando o produto da tabela correspondente ao id passado
        await knex<ProductRepository>("products").delete().where({ id })

        //Passando status 200 de sucesso
        res.status(200).json()
    } catch (error) {
        next(error)
    }
    }
}