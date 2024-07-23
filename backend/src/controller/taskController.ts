import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/taskModel";

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, column } = req.body;

    const task = new Task({
        title,
        description,
        column,
        user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, column } = req.body;

    const task: any = await Task.findById(req.params.id);

    if (task) {
        task.title = title;
        task.description = description;
        task.column = column;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error("Task not found");
    }
});

export const deleteTask = async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        await task.deleteOne();
        res.json({ message: "Task removed" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
};
