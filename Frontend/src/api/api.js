// src/api/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

/**
 * ⚠ IMPORTANTE:
 * Android Emulator:
 *   baseURL: "http://10.0.2.2:8080/api"
 * Dispositivo físico:
 *   baseURL: "http://TU_IP_LOCAL:8080/api"
 */
const api = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
    headers: { "Content-Type": "application/json" },
});

// 🔑 AGREGAR TOKEN AUTOMÁTICAMENTE
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ❌ MANEJO 401 (sesión expirada)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            Alert.alert("Sesión expirada", "Por favor inicia sesión nuevamente.");
            await AsyncStorage.multiRemove(["token", "user"]);
        }
        return Promise.reject(error);
    }
);

export default api;
