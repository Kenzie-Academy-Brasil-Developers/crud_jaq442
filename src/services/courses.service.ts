import format from "pg-format";
import { client } from "../database"
import { CourseCreate, CourseResult, CoursesRead } from "../interfaces/course.interface"
import { coursesReadSchema } from "../schemas/course.schema";

export const readCoursesService = async (userId: string) => {
   
      const queryString: string = `
      SELECT
      "uc"."courseId" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",   
      "uc"."active" AS "userActiveInCourse",
      "uc"."userId" AS "userId",
      "u"."name" AS "userName"
    FROM "users" AS "u"
    LEFT JOIN "userCourses" AS "uc"
      ON "uc"."userId" = "u"."id"
    LEFT JOIN "courses" AS "c"
      ON "uc"."courseId" = "c"."id"
    WHERE "uc"."userId" = $1
      `
  
      const query = await client.query(queryString, [userId])
  
      return query.rows

  }


  export const createCourseService = async (data: CourseCreate) => {
    const queryFormat: string = format(
      'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );

    const queryResult: CourseResult = await client.query(queryFormat);

    return queryResult.rows[0];
}


export const readAllCoursesService = async (): Promise<CoursesRead> => {
    const query: CourseResult = await client.query('SELECT * FROM "courses";');
    return coursesReadSchema.parse(query.rows);
  };
  
  export const createCourseUserService = async (courseId: string, userId: string): Promise<void> => {

    const queryString: string = `
    INSERT INTO "userCourses"
      ("courseId", "userId")
    VALUES ($1, $2)
    RETURNING *;
  `;

  await client.query(queryString, [courseId, userId]);
  };

  export const updateCourseUserService = async (courseId: string, userId: string): Promise<void> => {

    const queryString: string = `
    UPDATE "userCourses"
    SET "active" = false
    WHERE "courseId" = $1 AND "userId" = $2
    RETURNING *;
  `;

  await client.query(queryString, [courseId, userId]);
  };




  export const readUsersFromCourseService = async (courseId: string) => {
   
    const queryString: string = `
    SELECT
    "uc"."userId" AS "userId",
    "u"."name" AS "userName",
    "uc"."courseId" AS "courseId",   
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
  FROM "users" AS "u"
  LEFT JOIN "userCourses" AS "uc"
    ON "uc"."userId" = "u"."id"
  LEFT JOIN "courses" AS "c"
    ON "uc"."courseId" = "c"."id"
  WHERE "uc"."courseId" = $1
`

    const query = await client.query(queryString, [ courseId])

    return query.rows

}