// src/api/driversApi.js
import api from "./api";

const BASE_URL = "/drivers";

export const getAllDrivers = () => api.get(BASE_URL);
export const getDriverById = (id) => api.get(`${BASE_URL}/${id}`);
export const createDriver = (driver) => api.post(BASE_URL, driver);
export const updateDriver = (id, driver) => api.put(`${BASE_URL}/${id}`, driver);
export const deleteDriver = (id) => api.delete(`${BASE_URL}/${id}`);
