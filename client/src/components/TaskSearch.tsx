import React from "react";

interface TaskSearchProps {
    setSearch: (search: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ setSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search tasks"
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg"
        />
    );
};

export default TaskSearch;
