import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    googleId?: string;
    profileImageURL?: string;
}

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            isEmail: true,
            trim: true,
        },
        password: {
            type: String,
            minLength: 8,
            required: true,
            match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        },
        profileImageURL: {
            type: String,
            default: "https://avatar.iran.liara.run/public/boy?username=Ash",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
