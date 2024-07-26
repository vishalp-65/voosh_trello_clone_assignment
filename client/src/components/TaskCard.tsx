import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { timeAgo } from "../utils/helper";
import { deleteTask } from "../api/task";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { Task } from "../utils/types";

interface TaskCardProps {
    task: Task;
    index: number;
    onUpdate: (task: Task) => void; // Add a prop for updating the task
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onUpdate }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTask(task._id);
            // You might want to add some state update here to remove the task from the list
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    const handleSave = (task: Task) => {
        // Implement your logic to save the task here
        console.log("Task saved:", task);
    };

    return (
        <>
            <Draggable draggableId={`${task._id}`} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative my-2 flex flex-col items-start justify-start gap-2 w-full h-40 bg-white 
                        dark:bg-gray-900 rounded-md px-3 py-3 shadow-sm border border-gray-50 dark:border-gray-600"
                    >
                        <div className="flex items-center justify-between w-full">
                            <p
                                className={`p-1 px-2 rounded-full ${
                                    task.status == "TODO"
                                        ? "bg-gray-400 dark:bg-gray-600"
                                        : task.status === "INPROGRESS"
                                        ? "bg-blue-400 dark:bg-blue-600"
                                        : "bg-green-500 dark:bg-green-600"
                                } text-xs`}
                            >
                                {task.status}
                            </p>
                            <div className="flex items-center justify-end gap-2.5 text-lg">
                                <MdModeEditOutline
                                    className="cursor-pointer"
                                    onClick={() => setIsEditOpen(true)}
                                />
                                <MdDelete
                                    className="text-red-600 cursor-pointer"
                                    onClick={handleDelete}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-between gap-0.5 mb-1">
                            <p className="font-semibold text-lg">
                                {task.title}
                            </p>
                            <p>{task.description}</p>
                        </div>
                        <div className="absolute bottom-1.5 right-1.5 text-sm text-gray-500">
                            <p>{timeAgo(task.createdAt)}</p>
                        </div>
                    </div>
                )}
            </Draggable>
            <Modal onSave={handleSave} onClose={() => setIsEditOpen(false)} />
        </>
    );
};

export default TaskCard;
