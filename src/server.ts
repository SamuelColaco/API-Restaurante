
import express from "express"

import { productsRoutes } from "./routes/orders"
import { errorHandling } from "./middlewares/middleware"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(productsRoutes)

app.use(errorHandling)


app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}`))
