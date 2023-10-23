import { z } from "zod";
import { QueryResult } from "pg";
import { sessionSchema } from "../schemas/login.schema";

export type SessionRequest = z.infer<typeof sessionSchema>;
export type SessionResult = QueryResult<SessionRequest>;
