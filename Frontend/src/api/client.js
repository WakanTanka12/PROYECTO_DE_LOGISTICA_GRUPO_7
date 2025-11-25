// src/api/client.js
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

apiClient.interceptors.request.use(
    async (config) => {
        // Aquí luego puedes inyectar token si usas auth
        // const token = await AsyncStorage.getItem("token");
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
