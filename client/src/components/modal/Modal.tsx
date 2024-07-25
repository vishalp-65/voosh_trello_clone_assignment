import TaskForm from "../TaskForm";

interface Props {
    isOpen: boolean;
}

const Modal: React.FC<Props> = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-transparent backdrop-blur-md px-3">
            <div className="flex items-center justify-center w-[28rem] h-[25rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <TaskForm />
            </div>
        </div>
    );
};

export default Modal;
