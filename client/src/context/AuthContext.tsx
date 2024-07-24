import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, register, googleLogin } from "../api/auth";

interface AuthContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    googleLogin: (token: string) => Promise<void>;
    logout: () => void;
    error: string | null;
    clearError: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const data = await login(email, password);
            console.log("data", data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
        }
    };

    const handleRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        try {
            const data = await register(name, email, password);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        }
    };

    const handleGoogleLogin = async (token: string) => {
        try {
            const data = await googleLogin(token);
            console.log("data", data);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Google login failed. Please try again.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login: handleLogin,
                register: handleRegister,
                googleLogin: handleGoogleLogin,
                logout,
                error,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
