import React from "react";

interface TaskFilterProps {
    setFilter: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ setFilter }) => {
    return (
        <select
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg"
        >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
        </select>
    );
};

export default TaskFilter;
