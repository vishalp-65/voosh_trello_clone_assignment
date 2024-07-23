import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import PrivateRoute from "./router/PrivateRoute";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="p-4">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    {/* <Route
                        path="/"
                        element={
                            <PrivateRoute>
                            <TasksPage />
                            </PrivateRoute>
                            }
                            /> */}
                </Routes>
            </div>
        </div>
    );
};

export default App;
