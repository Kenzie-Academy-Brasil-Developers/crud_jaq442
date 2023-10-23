import { Router } from "express";

import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schemas/login.schema";
import { sessionController } from "../controllers/login.controller";


export const sessionRouter: Router = Router()

sessionRouter.post('/', validateBody(sessionSchema), sessionController)