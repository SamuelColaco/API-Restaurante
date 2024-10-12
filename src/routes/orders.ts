

import { Router } from "express"
import { Orders } from "../controller/orders"

const ordersRoutes = Router()
const ordersController = new Orders()

ordersRoutes.get("/orders", ordersController.index)
ordersRoutes.post("/orders", ordersController.create)

export { ordersRoutes } 
