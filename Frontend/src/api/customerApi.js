// src/api/customersApi.js
import api from "./api";

const BASE_URL = "/customers";

export const getAllCustomers = () => api.get(BASE_URL);
export const getCustomerById = (id) => api.get(`${BASE_URL}/${id}`);
export const addCustomer = (customer) => api.post(BASE_URL, customer);
export const updateCustomer = (id, customer) => api.put(`${BASE_URL}/${id}`, customer);
export const deleteCustomer = (id) => api.delete(`${BASE_URL}/${id}`);
