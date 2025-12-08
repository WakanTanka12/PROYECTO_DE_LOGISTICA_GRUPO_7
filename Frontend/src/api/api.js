// src/api/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const api = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
    headers: { "Content-Type": "application/json" },
});

// TOKEN → agregar automáticamente
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Manejar tokens expirados
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            Alert.alert("Sesión expirada", "Inicia sesión nuevamente.");
            await AsyncStorage.multiRemove(["token", "user"]);
        }
        return Promise.reject(error);
    }
);

export default api;
