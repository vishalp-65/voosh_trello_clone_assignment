import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    title: string;
    description?: string;
    status: string;
    user: mongoose.Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            required: true,
            default: "TODO",
            enum: ["TODO", "INPROGRESS", "DONE"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
