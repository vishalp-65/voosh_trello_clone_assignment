import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

const GoogleLoginButton: React.FC = () => {
    const { googleLogin } = useAuth();

    // const handleLogin = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         await googleLogin(tokenResponse.access_token);
    //     },
    //     onError: () => {
    //         console.log("Login Failed");
    //     },
    // });

    return (
        <GoogleLogin
            onSuccess={async (tokenResponse: any) => {
                await googleLogin(tokenResponse.access_token);
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};

export default GoogleLoginButton;
