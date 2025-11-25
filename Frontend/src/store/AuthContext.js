// src/store/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { loginUser } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   // {id, firstname, lastname, email, role, etc.}
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

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

                // Si ya tenemos user guardado, lo usamos
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                    setLoading(false);
                    return;
                }

                // Si tienes endpoint /auth/me, puedes usarlo para refrescar perfil
                const res = await api.get("/auth/me");
                setUser(res.data);
                setToken(storedToken);
                await AsyncStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                console.warn("Sesión inválida o expirada:", err);
                await logout(false);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    // 🟢 Login: hace llamada a backend, guarda token + user en AsyncStorage y estado
    const login = async (usernameOrEmail, password) => {
        try {
            // ajusta nombres según tu backend: { username, password } o { email, password }
            const data = await loginUser({ username: usernameOrEmail, password });

            const jwt = data.token;
            const userData = data.user || data; // por si tu backend devuelve {token, user} o todo junto

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

    // 🔴 Logout: limpia todo y deja que la navegación te mande al Login
    const logout = async (withDelay = false) => {
        await AsyncStorage.multiRemove(["token", "user"]);
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!token && !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
