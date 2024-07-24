import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface EventFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage: React.FC = () => {
    const { register, error, clearError } = useAuth();
    const [formData, setFormData] = useState<EventFormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Clear error when component is mounted or form data changes
        clearError();
    }, [formData]);

    const validate = () => {
        const errors: { [key: string]: string } = {};

        if (!formData.firstName) errors.firstName = "First name is required.";
        if (!formData.lastName) errors.lastName = "Last name is required.";
        if (!formData.email) errors.email = "Email is required.";
        if (!formData.password) errors.password = "Password is required.";
        if (!formData.confirmPassword)
            errors.confirmPassword = "Confirm password is required.";
        if (formData.confirmPassword !== formData.password)
            errors.confirmPassword = "Passwords do not match.";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const name = formData.firstName + " " + formData.lastName;
        await register(name, formData.email, formData.password);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-950 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <label className="block text-sm font-medium">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-gray-200/60 dark:bg-gray-900 text-black mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm">
                            {errors.firstName}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-gray-200/60 dark:bg-gray-900 text-black mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm">
                            {errors.lastName}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-200/60 dark:bg-gray-900 text-black mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                        required
                        className="bg-gray-200/60 dark:bg-gray-900 text-black mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Confirm Password
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="bg-gray-200/60 dark:bg-gray-900 text-black mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Register
                </button>
                <div className="flex items-center justify-center gap-2">
                    <p>Already have an account?</p>
                    <Link to="/login" className="text-blue-500">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
