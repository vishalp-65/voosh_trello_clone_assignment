import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { verifyGoogleAuthToken } from "../utils/googleAuth";
import { uploadToS3 } from "../config/s3";
import { IUser } from "../models/userModel";

interface AuthenticatedRequest extends Request {
    user?: IUser;
    file?: Express.Multer.File;
}

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user: any = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                profileImageURL: user.profileImageURL,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            profileImageURL: user.profileImageURL,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

export const updateUserProfile = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        const user = await User.findById(req.user?._id!);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.file) {
                const imageType = req.file.mimetype;
                const key = `uploads/users/${user._id}-${Date.now()}`;
                const signedURL = await uploadToS3(
                    req.file.buffer,
                    key,
                    imageType
                );
                user.profileImageURL = signedURL;
            }

            const updatedUser: any = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profileImageURL: updatedUser.profileImageURL,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
);

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    const userToken = await verifyGoogleAuthToken(token);

    res.json({ token: userToken });
});
