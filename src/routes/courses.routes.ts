import { Router } from "express";
import { courseCreateController, createCourseUserController, readAllCoursesController, readAllUsersFromCourseController, updateUserCourseController } from "../controllers/courses.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermission.middleware";
import { courseCreateSchema } from "../schemas/course.schema";
import { validateBody } from "../middlewares/validateBody.middleware";
import { validateIdCourseExists, validateIdCourseUserExists } from "../middlewares/validateIdExists.middleware";

export const coursesRouter: Router = Router()

coursesRouter.post('/', validateBody(courseCreateSchema), verifyToken, verifyPermissions, courseCreateController)

coursesRouter.get('/', readAllCoursesController)

coursesRouter.post('/:courseId/users/:userId', validateIdCourseUserExists, verifyToken, verifyPermissions, createCourseUserController)
coursesRouter.delete('/:courseId/users/:userId', validateIdCourseUserExists, verifyToken, verifyPermissions, updateUserCourseController)
coursesRouter.get('/:courseId/users', validateIdCourseExists, verifyToken, verifyPermissions, readAllUsersFromCourseController)