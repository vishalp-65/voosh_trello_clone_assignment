import React, { useState } from "react";
import { createTask } from "../api/task";
import toast from "react-hot-toast";

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"TODO" | "INPROGRESS" | "DONE">(
        "TODO"
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createTask({
                title,
                description,
                status,
                createdAt: "",
            });
            console.log("res", res);
            setTitle("");
            setDescription("");
            setStatus("TODO");
            toast.success("Task created");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full py-2 px-7">
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
                Create Task
            </button>
        </form>
    );
};

export default TaskForm;
