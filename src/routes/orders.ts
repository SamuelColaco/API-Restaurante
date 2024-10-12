

import { Router } from "express"
import { Orders } from "../controller/orders"

const ordersRoutes = Router()
const ordersController = new Orders()

ordersRoutes.get("/orders/table/:table_sessions_id", ordersController.index)
ordersRoutes.post("/orders", ordersController.create)
ordersRoutes.get("/orders/table/total/:table_sessions_id", ordersController.show)

export { ordersRoutes } 
