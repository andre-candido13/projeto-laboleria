import { Router } from "express";
import { getClientsByIdOrders } from "../controllers/clients.js";
import { getOrderById, getOrders, postOrder } from "../controllers/orders.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { ordersJoi } from "../schema/ordersJoi.js";


const ordersRouter = Router()


ordersRouter.post("/order", validateSchema(ordersJoi), postOrder)
ordersRouter.get("/orders", getOrders)
ordersRouter.get("/orders/:id", getOrderById)
ordersRouter.get("/clients/:id/orders", getClientsByIdOrders)


export default ordersRouter;