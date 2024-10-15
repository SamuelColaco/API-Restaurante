
//Importando dependencias
import { Router } from "express"
import { TablesController } from "../controller/tables"

export {  Router } from "express"
export { TablesController } from "../controller/tables"

//Passando a função Router para a constante
const routesTables = Router()
//Passando uma instancia da classe TablesController para a constante
const tablesController = new TablesController()

//Criando as rotas de messas da aplicação
routesTables.get("/tables", tablesController.index)
routesTables.post("/tables", tablesController.create)
routesTables.put("/tables/:id", tablesController.update)
routesTables.delete("/tables/:id", tablesController.delete)
//Exportando as rotas
export{ routesTables }