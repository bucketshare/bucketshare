import { Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { updateData } from "../services/db";

export const saveFCMtoken: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;
    const userid = "dlfa"

    await updateData<User>('users', userid, { token: token });
}