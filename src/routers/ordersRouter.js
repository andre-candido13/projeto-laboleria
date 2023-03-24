import { Router } from "express";
import { getOrders, postOrder } from "../controllers/orders.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { ordersJoi } from "../schema/ordersJoi.js";


const ordersRouter = Router()


ordersRouter.post("/order", validateSchema(ordersJoi), postOrder)
ordersRouter.get("/orders", getOrders)


export default ordersRouter;