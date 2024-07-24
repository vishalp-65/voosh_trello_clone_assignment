import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

const GoogleLoginButton: React.FC = () => {
    const { googleLogin } = useAuth();

    return (
        <GoogleLogin
            onSuccess={async (tokenResponse) => {
                try {
                    const token = tokenResponse.credential;
                    if (!token) {
                        throw new Error("Token is undefined");
                    }
                    const res = await googleLogin(token);
                } catch (error) {
                    console.log("Google login failed:", error);
                }
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};

export default GoogleLoginButton;
