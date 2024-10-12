
import { Router } from "express"
import { TablesSessions } from "../controller/tables-sessions-controller"

const tablesSessionsRoutes = Router()
const tablesSessions = new TablesSessions()

tablesSessionsRoutes.get("/tables-sessions", tablesSessions.index)
tablesSessionsRoutes.post("/tables-sessions", tablesSessions.create)
tablesSessionsRoutes.put("/tables-sessions/:id", tablesSessions.update)

export { tablesSessionsRoutes }

