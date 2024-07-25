import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, register, googleLogin, getUserByToken } from "../api/auth";

interface AuthContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    googleLogin: (token: string) => Promise<void>;
    logout: () => void;
    error: string | null;
    clearError: () => void;
    isModalOpen: boolean;
    handleModal: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            const data = await login(email, password);
            setUser(data);
            localStorage.setItem("trello_token", JSON.stringify(data.token));
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
            localStorage.setItem("trello_token", JSON.stringify(data.token));
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
            localStorage.setItem("trello_token", JSON.stringify(data.token));
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

    const fetchUser = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("trello_token");

        if (token) {
            try {
                const user = await getUserByToken(token);
                setUser(user);
            } catch (err) {
                setError((err as Error).message || "An error occurred");
            }
        }
        setIsLoading(false);
    };

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) {
        <div>Loding..</div>;
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

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
                isModalOpen,
                handleModal,
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
