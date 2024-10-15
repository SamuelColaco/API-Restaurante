
//Importando dependencias
import { Router } from "express"
import { Orders } from "../controller/orders"
//Passando a função Router para a constante
const ordersRoutes = Router()
//Passando uma instancia da classe Orders para a constante
const ordersController = new Orders()
//Criando as rotas de pedidos da aplicação
ordersRoutes.get("/orders/table/:table_sessions_id", ordersController.index)
ordersRoutes.post("/orders", ordersController.create)
ordersRoutes.get("/orders/table/total/:table_sessions_id", ordersController.show)
//Exportando as rotas
export { ordersRoutes } 
