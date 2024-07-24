import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ThemeContextProvider from "./context/theme-context";
import ThemeSwitch from "./components/theme-switch";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeContextProvider>
                        <div className="bg-gray-100 min-h-screen text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90">
                            {/* App component  */}
                            <App />

                            {/* Theme button */}
                            <ThemeSwitch />
                        </div>
                    </ThemeContextProvider>
                </AuthProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
