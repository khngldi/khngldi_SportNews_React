import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const getInitialUser = () => {
        const storedUser = localStorage.getItem("authUser");
        if (!storedUser || storedUser === "undefined") return null;

        try {
            const userObj = JSON.parse(storedUser);
            if (!userObj.email) return null;
            return userObj;
        } catch {
            console.error("Ошибка парсинга authUser");
            return null;
        }
    };


    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(getInitialUser());
    const isAuthenticated = !!token;

    const loginSuccess = (userData, userToken, email) => {
        const user = { ...userData, email };

        setToken(userToken);
        setUser(user);

        localStorage.setItem("authToken", userToken);
        localStorage.setItem("authUser", JSON.stringify(user));
    };


    const register = async (email, password) => {
        try {
            const response = await fetch(
                `https://c3b36cdc3750f333.mokky.dev/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                loginSuccess(data.user, data.token, email);
                return { success: true };
            }

            return { success: false, error: data.message || "Ошибка" };
        } catch {
            return { success: false, error: "Ошибка сети" };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(
                `https://c3b36cdc3750f333.mokky.dev/auth`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                loginSuccess(data.user, data.token, email);
                return { success: true };
            }

            return { success: false, error: data.message || "Ошибка" };
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
