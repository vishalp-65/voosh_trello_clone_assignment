import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TaskContainer from "./TaskContainer";
import { fetchTasks, Task } from "../api/task";

const TaskList: React.FC = () => {
    const taskStatuses = [
        { id: "status-1", status: "TODO" },
        { id: "status-2", status: "INPROGRESS" },
        { id: "status-3", status: "DONE" },
    ];
    const [tasks, setTasks] = useState<Task[]>([]);

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

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        const destinationStatus = taskStatuses.find(
            (status) => status.id === destination.droppableId
        )?.status;

        if (destinationStatus) {
            movedTask.status = destinationStatus as Task["status"];
            updatedTasks.splice(destination.index, 0, movedTask);
            setTasks(updatedTasks);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full h-auto flex items-center justify-between gap-5">
                {taskStatuses.map(({ id, status }) => (
                    <Droppable key={id} droppableId={id} type="group">
                        {(provided) => (
                            <div
                                className="w-1/3 h-full overflow-y-a"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <TaskContainer status={status} tasks={tasks} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskList;
