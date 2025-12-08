// src/api/authService.js
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loginUser(credentials) {
    const { data } = await api.post("/auth/login", credentials);

    // Guardar token y user en AsyncStorage
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data));

    return data;
}

export async function registerUser(payload) {
    const { data } = await api.post("/auth/register", payload);

    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data));

    return data;
}
