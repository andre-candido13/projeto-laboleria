import { Router } from "express";
import { createCakes } from "../controllers/cakes.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { cakesJoi } from "../schema/cakesJoi.js";

const cakesRouter = Router()


cakesRouter.post("/cakes", validateSchema(cakesJoi), createCakes)


export default cakesRouter;