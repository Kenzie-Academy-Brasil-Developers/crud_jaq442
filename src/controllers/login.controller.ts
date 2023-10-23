import { Request, Response } from "express";
import { loginSevice } from "../services/login.service";


export const sessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = await loginSevice(req.body);

  return res.status(200).json(token);
};