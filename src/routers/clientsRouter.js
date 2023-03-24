import { Router } from "express";
import { postClients } from "../controllers/clients.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { clientsJoi } from "../schema/clientsJoi.js";


const clientsRouter = Router()


clientsRouter.post("/clients", validateSchema(clientsJoi), postClients)


export default clientsRouter;