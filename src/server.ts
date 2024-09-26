
import express from "express"

import { routes } from "./routes/orders"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}`))
