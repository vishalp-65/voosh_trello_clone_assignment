import React from "react";

interface TaskSortProps {
    setSort: (sort: string) => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ setSort }) => {
    return (
        <select
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded-lg"
        >
            <option value="">Sort by</option>
            <option value="date">Date</option>
            <option value="priority">Priority</option>
        </select>
    );
};

export default TaskSort;
