import { QueryResult } from "pg";
import { z } from 'zod'
import { courseCreateSchema, courseSchema, coursesReadSchema, userCourseReadSchema, userCourseSchema } from "../schemas/course.schema";


export type UserCourse = z.infer<typeof userCourseSchema>
export type UserCourseRead = z.infer<typeof userCourseReadSchema>;
export type UserCourseResult = QueryResult<UserCourse>;


export type Course = z.infer<typeof courseSchema>
export type CoursesRead = z.infer<typeof coursesReadSchema>;
export type CourseCreate = z.infer<typeof courseCreateSchema>
export type CourseResult = QueryResult<UserCourse>;