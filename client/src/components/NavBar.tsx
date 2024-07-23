import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="text-white">
                <Link to="/" className="text-xl font-bold">
                    Task Manager
                </Link>
            </div>
            <div className="flex items-center">
                {!user ? (
                    <>
                        <Link to="/login" className="mr-4 text-white">
                            Login
                        </Link>
                        <Link to="/register" className="text-white">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="mr-4 text-white">
                            Hello, {user.name}
                        </span>
                        <button onClick={logout} className="text-white">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
