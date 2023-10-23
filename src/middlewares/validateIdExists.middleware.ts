import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/user.interface";
import { client } from "../database";
import AppError from "../errors/App.error";


export const validateIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1',
    [userId]
  );

  if (query.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};

export const validateIdCourseUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId, courseId } = req.params;
  
    const userQuery = await client.query('SELECT * FROM "users" WHERE "id" = $1', [userId]);
    const courseQuery = await client.query('SELECT * FROM "courses" WHERE "id" = $1', [courseId]);
  
    if (userQuery.rowCount === 0 || courseQuery.rowCount === 0) {
      throw new AppError("User/course not found", 404);
    }
  
    res.locals = { ...res.locals, foundUser: userQuery.rows[0], foundCourse: courseQuery.rows[0] };
  
    return next();
  };

  export const validateIdCourseExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { courseId } = req.params;
  
    const query: UserResult = await client.query(
      'SELECT * FROM "userCourses" WHERE "id" = $1',
      [courseId]
    );
  
    if (query.rowCount === 0) {
      throw new AppError("Couse not found", 404);
    }
  
    res.locals = { ...res.locals, foundUser: query.rows[0] };
  
    return next();
  };