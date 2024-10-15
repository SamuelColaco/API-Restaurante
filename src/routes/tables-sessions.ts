
//Importando dependencias
import { Router } from "express"
import { TablesSessions } from "../controller/tables-sessions-controller"

//Passando a função Router para a constante
const tablesSessionsRoutes = Router()
//Passando uma instancia da classe TablesSessions para a constante
const tablesSessions = new TablesSessions()

//Criando as rotas de sessões das mesas da aplicação
tablesSessionsRoutes.get("/tables-sessions", tablesSessions.index)
tablesSessionsRoutes.post("/tables-sessions", tablesSessions.create)
tablesSessionsRoutes.put("/tables-sessions/:id", tablesSessions.update)
//Exportando as rotas
export { tablesSessionsRoutes }

