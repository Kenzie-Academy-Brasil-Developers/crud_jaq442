import { Request, Response } from "express";
import {
  createCourseService,
  createCourseUserService,
  readAllCoursesService,
  readUsersFromCourseService,
  updateCourseUserService,
} from "../services/courses.service";
import { CoursesRead } from "../interfaces/course.interface";

export const courseCreateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course = await createCourseService(req.body);

  return res.status(201).json(course);
};

export const readAllCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses: CoursesRead = await readAllCoursesService();
  return res.status(200).json(courses);
};


  export const createCourseUserController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { courseId, userId } = req.params;
  
    await createCourseUserService(courseId, userId);
  
    return res.status(201).json({ message: "User successfully vinculed to course" });
  };

  export const updateUserCourseController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { courseId, userId } = req.params;
  
    await updateCourseUserService(courseId, userId);
  
    return res.status(204).json();
  };

  export const readAllUsersFromCourseController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { courseId } = req.params;
  
    const users = await readUsersFromCourseService(courseId);
  
    return res.status(200).json(users);
  };

