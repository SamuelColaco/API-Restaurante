
import { Router } from "express"
import { TablesSessions } from "../controller/tables-sessions-controller"

const tablesSessionsRoutes = Router()
const tablesSessions = new TablesSessions()

tablesSessionsRoutes.post("/tables-sessions", tablesSessions.create)

export { tablesSessionsRoutes }

