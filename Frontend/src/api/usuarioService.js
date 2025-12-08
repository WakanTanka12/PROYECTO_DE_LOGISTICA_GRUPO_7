// src/api/usuarioService.js
import api from "./api";

export const getUsuarios = async () => {
    const { data } = await api.get("/usuarios");
    return data;
};
