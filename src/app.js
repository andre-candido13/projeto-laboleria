import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cakesRouter from "./routers/cakesRouter.js"
import clientsRouter from "./routers/clientsRouter.js"
import ordersRouter from "./routers/ordersRouter.js"





dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())




//routes
app.use([ cakesRouter, clientsRouter, ordersRouter ])


app.listen(5000, () => console.log("Servidor ON na porta", + 5000))