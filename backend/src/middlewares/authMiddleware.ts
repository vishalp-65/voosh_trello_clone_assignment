import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import serverConfig from "../config/server-config";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token = req.header("Authorization")?.replace("Bearer ", "");
        token = token?.replace(/^"(.*)"$/, "$1");
        // console.log("token value", token);
        try {
            const decoded = jwt.verify(
                token!,
                serverConfig.JWT_SECRET_KEY as string
            );

            req.user = await User.findById((decoded as any).id).select(
                "-password"
            );

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
);
