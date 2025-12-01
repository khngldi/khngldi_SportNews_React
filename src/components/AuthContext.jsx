import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:2000";

export const AuthProvider = ({ children }) => {

    const getInitialUser = () => {
        const storedUser = localStorage.getItem("authUser");
        if (!storedUser || storedUser === "undefined") return null;

        try {
            const userObj = JSON.parse(storedUser);
            if (!userObj.username) return null;
            return userObj;
        } catch {
            console.error("Ошибка парсинга authUser");
            return null;
        }
    };

    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(getInitialUser());
    const isAuthenticated = !!token;

    const loginSuccess = (userData, userToken) => {
        setToken(userToken);
        setUser(userData);

        localStorage.setItem("authToken", userToken);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };


    const register = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                loginSuccess({ username: email }, data.token);
                return { success: true };
            }

            return { success: false, error: data.message };
        } catch {
            return { success: false, error: "Ошибка сети" };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                loginSuccess({ email }, data.token);
                return { success: true };
            }

            return { success: false, error: data.message };
        } catch {
            return { success: false, error: "Ошибка сети" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                token,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
