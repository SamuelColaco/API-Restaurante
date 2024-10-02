
import { Router } from "express";
import { ProductsControllers } from "../controller/Methods";


const productsRoutes = Router()
const methods = new ProductsControllers()

productsRoutes.get("/", methods.index)

productsRoutes.post("/products", methods.create)

productsRoutes.put("/products/:id", methods.update)

productsRoutes.delete("/products/:id", methods.delete)

export { productsRoutes }