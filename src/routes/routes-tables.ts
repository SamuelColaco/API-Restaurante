import { Router } from "express"
import { TablesController } from "../controller/tables"

export {  Router } from "express"
export { TablesController } from "../controller/tables"

const routesTables = Router()
const tablesController = new TablesController()

routesTables.get("/tables", tablesController.index)
routesTables.post("/tables", tablesController.create)

export{ routesTables }