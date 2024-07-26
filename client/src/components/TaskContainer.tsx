import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../utils/types";

interface TaskContainerProps {
    status: string;
    tasks: Task[];
    onUpdate: (task: Task) => void; // Add onUpdate prop to TaskContainerProps
}

const TaskContainer: React.FC<TaskContainerProps> = ({
    status,
    tasks,
    onUpdate,
}) => {
    const filteredTasks = tasks.filter((task) => task.status === status);

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            {filteredTasks.map((task, index) => (
                <div className="px-1" key={task._id}>
                    <TaskCard task={task} index={index} onUpdate={onUpdate} />{" "}
                    {/* Pass the onUpdate prop */}
                </div>
            ))}
        </div>
    );
};

export default TaskContainer;
