import { Router } from "express";
import { userRouter } from "./users.routes";
import { sessionRouter } from "./login.routes";
import { coursesRouter } from "./courses.routes";


export const routes: Router = Router()

routes.use('/users', userRouter)
routes.use('/login', sessionRouter)
routes.use('/courses', coursesRouter)
