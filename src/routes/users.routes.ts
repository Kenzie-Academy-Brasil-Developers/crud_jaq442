import { Router } from "express";
import { isEmailUnique } from "../middlewares/isEmailUnique.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { createUserController, readCoursesController, readUserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermission.middleware";
import { validateIdExists } from "../middlewares/validateIdExists.middleware";
import { validateUserWithCourse } from "../middlewares/validateUserWithCourse.middleware";

export const userRouter: Router = Router()

userRouter.post("/", validateBody(userCreateSchema), isEmailUnique, createUserController)

userRouter.get("/", verifyToken, verifyPermissions, readUserController)

userRouter.get("/:userId/courses", validateIdExists, verifyToken, verifyPermissions, validateUserWithCourse, readCoursesController)