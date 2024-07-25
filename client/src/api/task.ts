const endpoint = process.env.REACT_APP_BACKEND_URL;

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "TODO" | "INPROGRESS" | "DONE";
    createdAt: string | "";
}

const token = `Bearer ${localStorage.getItem("trello_token")}`;
// console.log("token value", token);

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${endpoint}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return response.json();
};

export const createTask = async (task: Omit<Task, "_id">): Promise<Task> => {
    const response = await fetch(`${endpoint}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to create task");
    }
    return response.json();
};

export const updateTask = async (
    _id: string,
    task: Partial<Task>
): Promise<Task> => {
    const response = await fetch(`${endpoint}/tasks/${_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
    return response.json();
};

export const deleteTask = async (_id: string): Promise<void> => {
    const response = await fetch(`${endpoint}/tasks/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
};
