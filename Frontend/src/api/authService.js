// src/api/authService.js
import api from "./api";

// credentials = { username, password } o { email, password } según tu backend
export async function loginUser(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    // data puede ser { token, user } o algo similar
    return data;
}

export async function registerUser(payload) {
    const { data } = await api.post("/auth/register", payload);
    return data;
}
