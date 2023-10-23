import { NextFunction, Request, Response } from "express";

import { client } from "../database";
import AppError from "../errors/App.error";


export const validateUserWithCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;
   
    const userCourses = await client.query(
    'SELECT * FROM "userCourses" WHERE "userId" = $1;',
    [userId]
  )

  if (userCourses.rows.length === 0){
    throw new AppError('No course found', 404)
  }

  return next()
}