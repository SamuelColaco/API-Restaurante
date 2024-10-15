
//Importando as dependencias
import { Router } from "express";
import { ProductsControllers } from "../controller/Methods";

//Passando a função Router para a constante
const productsRoutes = Router()
//Passando uma instancia da classe ProductsControllers para a constante
const methods = new ProductsControllers()

//Criando as rotas de produtos da aplicação
productsRoutes.get("/", methods.index)

productsRoutes.post("/products", methods.create)

productsRoutes.put("/products/:id", methods.update)

productsRoutes.delete("/products/:id", methods.delete)
//Exportando as rotas
export { productsRoutes }