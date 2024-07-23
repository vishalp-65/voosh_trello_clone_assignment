import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET as string
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
        }

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
);
