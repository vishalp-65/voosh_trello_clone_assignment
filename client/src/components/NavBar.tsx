import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-50 dark:bg-gray-950 shadow-sm rounded-b-sm p-4 flex justify-between items-center">
            <div className="">
                <Link to="/" className="text-xl font-bold">
                    Task Manager
                </Link>
            </div>
            <div className="flex items-center">
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="mr-4 px-2 py-1.5 rounded-md bg-blue-500 text-white"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className=" px-2 py-1.5 rounded-md bg-blue-500 text-white"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="mr-4">Hello, {user.name}</span>
                        <button onClick={logout} className="">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
