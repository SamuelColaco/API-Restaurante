
import express from "express"

import { productsRoutes } from "./routes/products"
import { errorHandling } from "./middlewares/middleware"
import { routesTables } from "./routes/routes-tables"
import { tablesSessionsRoutes } from "./routes/tables-sessions"
import { ordersRoutes } from "./routes/orders"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(productsRoutes)
app.use(routesTables)
app.use(tablesSessionsRoutes)
app.use(ordersRoutes)

app.use(errorHandling)


app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}`))

