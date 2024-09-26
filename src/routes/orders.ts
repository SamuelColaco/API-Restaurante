
import { Router } from "express";
import { ProductsControllers } from "../utils/Methods";



import { MiddlewareChange } from "../middlewares/middleware";

const routes = Router()
const methods = new ProductsControllers()

routes.get("/", methods.index)

routes.post("/products", MiddlewareChange, methods.create)

export { routes }