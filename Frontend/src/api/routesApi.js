// src/api/routesApi.js
import api from "./api";

const BASE_URL = "/routes";

export const getAllRoutes = () => api.get(BASE_URL);
export const getRouteById = (id) => api.get(`${BASE_URL}/${id}`);
export const createRoute = (route) => api.post(BASE_URL, route);
export const updateRoute = (id, route) => api.put(`${BASE_URL}/${id}`, route);
export const deleteRoute = (id) => api.delete(`${BASE_URL}/${id}`);
