const BASE_URL = "http://10.0.2.2:8080/api";

export const getUsuarios = async () => {
    const res = await fetch(`${BASE_URL}/usuarios`);
    return await res.json();
};
