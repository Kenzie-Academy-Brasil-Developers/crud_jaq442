import format from "pg-format";
import { UserCreate, UserRead, UserResult } from "../interfaces/user.interface";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/users.schema";
import { hash } from "bcryptjs";

export const createUserService = async (data: UserCreate) => {
    data.password = await hash(data.password, 10)

    const queryFormat: string = format(
      'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
      Object.keys(data),
      Object.values(data)
    );

    const query: UserResult = await client.query(queryFormat);

    return userReturnSchema.parse(query.rows[0])
}

export const readUserService = async (): Promise<UserRead> => {
    const query: UserResult = await client.query('SELECT * FROM "users";');
    return userReadSchema.parse(query.rows);
  };
  