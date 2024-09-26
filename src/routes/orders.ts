
import { Router } from "express";
import { ProductsControllers } from "../controller/Methods";



import { MiddlewareChange } from "../middlewares/middleware";

const productsRoutes = Router()
const methods = new ProductsControllers()

productsRoutes.get("/", methods.index)

productsRoutes.post("/products", MiddlewareChange, methods.create)

export { productsRoutes }