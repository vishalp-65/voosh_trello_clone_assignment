import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { timeAgo } from "../utils/helper";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: "TODO" | "INPROGRESS" | "DONE";
    createdAt: string;
}

interface TaskCardProps {
    task: Task;
    index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    return (
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
                        <p className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                            <BsThreeDotsVertical />
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-0.5 mb-1">
                        <p className="font-semibold text-lg">{task.title}</p>
                        <p>{task.description}</p>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 text-sm text-gray-500">
                        <p>{timeAgo(task.createdAt)}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
