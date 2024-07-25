import React from "react";
import { deleteTask, Task, updateTask } from "../api/task";

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const handleStatusChange = async (
        status: "TODO" | "INPROGRESS" | "DONE"
    ) => {
        try {
            await updateTask(task._id, { status });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task._id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 mb-2 bg-gray-700 rounded-lg">
            <h3 className="text-white">{task.title}</h3>
            <p className="text-gray-300">{task.description}</p>
            <div className="mt-2">
                <select
                    value={task.status}
                    onChange={(e) =>
                        handleStatusChange(
                            e.target.value as "TODO" | "INPROGRESS" | "DONE"
                        )
                    }
                    className="p-2 mt-2 text-black rounded"
                >
                    <option value="TODO">TODO</option>
                    <option value="INPROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                <button
                    onClick={handleDelete}
                    className="p-2 mt-2 ml-2 text-white bg-red-600 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
