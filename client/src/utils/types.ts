export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "TODO" | "INPROGRESS" | "DONE";
    createdAt: string;
}
