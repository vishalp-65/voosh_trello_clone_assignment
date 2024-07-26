import React from "react";
import TaskForm from "./TaskForm";
import { Task } from "../utils/types";

interface ModalProps {
    onClose: () => void;
    onSave: (task: Task) => void; // Add onSave prop to ModalProps
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex items-center justify-center h-screen w-screen bg-transparent backdrop-blur-md px-3">
                <div className="flex items-center justify-center w-[28rem] h-[25rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                    <TaskForm onSave={onSave} /> {/* Pass the onSave prop */}
                </div>
            </div>
        </div>
    );
};

export default Modal;
