// src/api/ordersApi.js
import apiClient from "./client";

export const getOrders = async () => {
    const res = await apiClient.get("/orders");
    return res.data;
};

export const getOrderById = async (id) => {
    const res = await apiClient.get(`/orders/${id}`);
    return res.data;
};

export const createOrder = async (order) => {
    const res = await apiClient.post("/orders", order);
    return res.data;
};

export const updateOrder = async (id, order) => {
    const res = await apiClient.put(`/orders/${id}`, order);
    return res.data;
};
// src/api/ordersApi.js
import api from "./api";

const BASE_URL = "/orders";
const CUSTOMER_URL = "/customers";

export const getAllOrders = () => api.get(BASE_URL);
export const getOrderById = (id) => api.get(`${BASE_URL}/${id}`);
export const createOrder = (order) => api.post(BASE_URL, order);
export const updateOrder = (id, order) => api.put(`${BASE_URL}/${id}`, order);
export const deleteOrder = (id) => api.delete(`${BASE_URL}/${id}`);

// extra
export const getAllCustomers = () => api.get(CUSTOMER_URL);
