import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TaskContainer from "./TaskContainer";
import { fetchTasks, updateTask, Task } from "../api/task";

const TaskList: React.FC = () => {
    const taskStatuses = [
        { id: "status-1", status: "TODO" },
        { id: "status-2", status: "INPROGRESS" },
        { id: "status-3", status: "DONE" },
    ];
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasks = await fetchTasks();
                setTasks(tasks);
            } catch (error) {
                console.error(error);
            }
        };

        getTasks();
    }, []);

    useEffect(() => {
        if (search) {
            setFilteredTasks(
                tasks.filter((task) =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredTasks(tasks);
        }
    }, [search, tasks]);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const updatedTasks = Array.from(filteredTasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        const destinationStatus = taskStatuses.find(
            (status) => status.id === destination.droppableId
        )?.status;

        if (destinationStatus) {
            movedTask.status = destinationStatus as Task["status"];
            updatedTasks.splice(destination.index, 0, movedTask);
            setFilteredTasks(updatedTasks);

            try {
                await updateTask(movedTask._id, {
                    status: destinationStatus,
                } as Task);
            } catch (error) {
                console.error("Failed to update task status", error);
            }
        }
    };

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 bg-gray-200 dark:bg-gray-900 rounded"
                />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full h-screen flex items-center justify-between gap-5">
                    {taskStatuses.map(({ id, status }) => (
                        <Droppable key={id} droppableId={id}>
                            {(provided) => (
                                <div
                                    className="w-1/3 h-full overflow-y-auto"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <TaskContainer
                                        status={status}
                                        tasks={filteredTasks}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskList;
