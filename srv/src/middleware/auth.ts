import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../config/jwt";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    try {
        const decoded = verifyJWT(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
