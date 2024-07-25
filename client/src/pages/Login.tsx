import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { Link } from "react-router-dom";
import { googleLogin } from "../api/auth";

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { user, login, error, clearError } = useAuth();

    useEffect(() => {
        // Clear error when component is mounted or form data changes
        clearError();
    }, [formData]);

    const validate = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.email) errors.email = "Email is required.";
        if (!formData.password) errors.password = "Password is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await login(formData.email, formData.password);
    };

    const handleSuccess = async (response: any) => {
        const token = response.tokenId;
        await googleLogin(token);
    };

    const handleFailure = (error: any) => {
        console.error("Google login failed", error);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-50 dark:bg-gray-950 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-200/60 dark:bg-gray-900 mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-200/60 dark:bg-gray-900 mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="w-full flex items-center justify-center">
                    <GoogleLoginButton />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
                <div className="flex items-center justify-center gap-2">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
