
import { Request, Response } from "express";
import { createUserService, readUserService } from "../services/user.service";
import { UserRead } from "../interfaces/user.interface";
import { readCoursesService } from "../services/courses.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  };

  export const readUserController = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await readUserService();
    return res.status(200).json(users);
  };

  export const readCoursesController = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    const courses = await readCoursesService(userId);
    return res.status(200).json(courses);
  };