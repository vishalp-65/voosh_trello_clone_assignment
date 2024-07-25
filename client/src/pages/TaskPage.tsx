import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TasksPage: React.FC = () => {
    const [createButtom, setcreateButtom] = useState(false);
    return (
        <div className="w-full mx-auto mt-4">
            <div className="flex items-end justify-end mr-10">
                <button
                    className="px-2 py-1.5 bg-blue-500 text-white rounded-md"
                    onClick={() => setcreateButtom(!createButtom)}
                >
                    Create a Task
                </button>
            </div>
            {createButtom && <TaskForm />}
            <div className="w-full md:w-[85%] flex items-center justify-center">
                <TaskList />
            </div>
        </div>
    );
};

export default TasksPage;
