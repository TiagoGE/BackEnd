import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { Data } from "../Interfaces/Data";
dotenv.config();

interface Extended extends Request {

    info?: Data
}
export const VerifyToken = (req: Extended, res: Response, next: NextFunction) => {

    try {

        const token = req.headers['token'] as string;

        if (!token) {
            return res.json({ message: "You are Not authenticated" })
        }

        const data = jwt.verify(token, process.env.KEY as string) as Data
        req.info = data;

    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." })
    }

    next()

}