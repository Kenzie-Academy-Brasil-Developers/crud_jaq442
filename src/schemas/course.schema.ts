import { z } from "zod";

export const userCourseSchema = z.object({
  id: z.number().positive(),
  userId: z.number().positive(),
  courseId: z.number().positive(),
  active: z.boolean().default(true),
});

export const userCourseReadSchema = userCourseSchema.array();

export const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

export const courseCreateSchema = courseSchema.omit({
  id: true,
});

export const coursesReadSchema = courseSchema.array();
