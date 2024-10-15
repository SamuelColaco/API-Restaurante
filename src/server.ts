
//Importando Dependencias
import express from "express"

import { productsRoutes } from "./routes/products"
import { errorHandling } from "./middlewares/middleware"
import { routesTables } from "./routes/routes-tables"
import { tablesSessionsRoutes } from "./routes/tables-sessions"
import { ordersRoutes } from "./routes/orders"

//Criando a porta que rodará o server
const PORT = 3333

//Passando as funções do express para a constante app
const app = express()
//Definindo que o corpo da requisição suportara o formato json
app.use(express.json())

//Passando as rotas da aplicação
app.use(productsRoutes)
app.use(routesTables)
app.use(tablesSessionsRoutes)
app.use(ordersRoutes)

//Passando o middlewarer de erros de forma global
app.use(errorHandling)

//Escutando a porta e escrevendo a mensagem no console
app.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}`))

