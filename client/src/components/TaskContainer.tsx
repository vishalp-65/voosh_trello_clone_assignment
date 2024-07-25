import React from "react";
import TaskCard from "./TaskCard";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: "TODO" | "INPROGRESS" | "DONE";
    createdAt: string | "";
}

type TaskContainerProps = {
    status: string;
    tasks: Task[];
};

const TaskContainer: React.FC<TaskContainerProps> = ({ status, tasks }) => {
    const filteredTasks = tasks.filter((task) => task.status === status);

    return (
        <div className="rounded-md px-2 p-2 bg-gray-200/80 dark:bg-gray-900/40 shadow-sm">
            <div className="w-full flex items-center justify-between px-1 py-1.5 border-b border-gray-400">
                <p>{status}</p>
            </div>
            <div className="relative min-h-screen">
                <div className="mt-7">
                    {filteredTasks.map((task, index) => (
                        <div className="px-1">
                            <TaskCard
                                key={task._id}
                                task={task}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskContainer;
