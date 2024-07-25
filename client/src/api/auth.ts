const endpoint = process.env.REACT_APP_BACKEND_URL;

export const login = async (email: string, password: string) => {
    const response = await fetch(`${endpoint}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    return response.json();
};

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const response = await fetch(`${endpoint}/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
};

export const googleLogin = async (token: string) => {
    const response = await fetch(`${endpoint}/users/google-login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google login failed");
    }

    return response.json();
};

export const getUserByToken = async (token: string) => {
    const response = await fetch(`${endpoint}/users/getUserByToken`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("trello_token")}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Token invaild");
    }

    return response.json();
};
