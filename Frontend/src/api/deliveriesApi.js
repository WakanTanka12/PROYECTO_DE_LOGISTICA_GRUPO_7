// src/api/deliveriesApi.js
import api from "./api";

const BASE_URL = "/deliveries";

export const getAllDeliveries = () => api.get(BASE_URL);
export const getDeliveryById = (id) => api.get(`${BASE_URL}/${id}`);
export const createDelivery = (delivery) => api.post(BASE_URL, delivery);
export const updateDelivery = (id, delivery) => api.put(`${BASE_URL}/${id}`, delivery);
export const deleteDelivery = (id) => api.delete(`${BASE_URL}/${id}`);
