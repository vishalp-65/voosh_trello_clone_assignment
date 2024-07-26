import React, { useState } from "react";
import { createTask, updateTask } from "../api/task";
import toast from "react-hot-toast";
import { Task } from "../utils/types";

interface TaskFormProps {
    task?: Task;
    onSave: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [status, setStatus] = useState<"TODO" | "INPROGRESS" | "DONE">(
        task?.status || "TODO"
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (task?._id) {
                const updatedTask = await updateTask(task._id, {
                    title,
                    description,
                    status,
                });
                onSave(updatedTask);
                toast.success("Task updated");
            } else {
                const newTask = await createTask({
                    title,
                    description,
                    status,
                    createdAt: "",
                });
                onSave(newTask);
                toast.success("Task created");
            }
            setTitle("");
            setDescription("");
            setStatus("TODO");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-[28rem] bg-white dark:bg-gray-950 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="py-2 px-7">
                <div className="mb-4">
                    <label className="block">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mt-2 bg-gray-200/60 dark:bg-gray-900 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 mt-2 bg-gray-200/60 dark:bg-gray-900 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Status</label>
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value as "TODO" | "INPROGRESS" | "DONE"
                            )
                        }
                        className="w-full p-2 mt-2 bg-gray-200/60 dark:bg-gray-900 rounded"
                    >
                        <option value="TODO">TODO</option>
                        <option value="INPROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 mt-4 text-white bg-blue-600 rounded"
                >
                    {task ? "Update Task" : "Create Task"}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
