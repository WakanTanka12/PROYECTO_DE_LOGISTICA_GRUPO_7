// src/store/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { loginUser } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   // {userId, firstname, lastname, email, role, ...}
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // loading global de restaurar sesión

    // 🔄 Restaurar sesión al iniciar la app
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                const storedUser = await AsyncStorage.getItem("user");

                if (!storedToken) {
                    setLoading(false);
                    return;
                }

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                    setLoading(false);
                    return;
                }

                // Si no hay user guardado pero sí token, intentamos /auth/me
                const res = await api.get("/auth/me");
                setUser(res.data);
                setToken(storedToken);
                await AsyncStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                console.warn("Sesión inválida o expirada:", err);
                await logout();
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    // 🟢 Login: email + password (como tu backend)
    const login = async (email, password) => {
        try {
            // tu backend espera { email, password }
            const data = await loginUser({ email, password });

            const jwt = data.token;
            const userData = data; // { token, userId, email, firstname, lastname, role }

            await AsyncStorage.setItem("token", jwt);
            await AsyncStorage.setItem("user", JSON.stringify(userData));

            setToken(jwt);
            setUser(userData);

            return true;
        } catch (err) {
            console.error("Error al iniciar sesión:", err.response?.data || err);
            return false;
        }
    };

    // 🔴 Logout: limpia todo
    const logout = async () => {
        await AsyncStorage.multiRemove(["token", "user"]);
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,                   // loading global (restaurando sesión)
                isAuthenticated: !!token && !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
