import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "../utils/types";

const TaskPage: React.FC = () => {
    const [createButton, setCreateButton] = useState(false);

    const handleSave = (task: Task) => {
        // Implement your logic to save the task here
        console.log("Task saved:", task);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => setCreateButton(!createButton)}
                >
                    {createButton ? "Close Form" : "Create Task"}
                </button>
            </div>
            {createButton && <TaskForm onSave={handleSave} />}{" "}
            {/* Pass the onSave prop */}
            <div className="w-full mt-10 md:w-[85%] flex items-center justify-center">
                <TaskList />
            </div>
        </div>
    );
};

export default TaskPage;
