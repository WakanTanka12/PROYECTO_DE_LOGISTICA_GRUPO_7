import api from "./api";

const ORD_URL = "/orders";
const CUS_URL = "/customers";

export const getAllOrders = () => api.get(ORD_URL);
export const getOrderById = (id) => api.get(`${ORD_URL}/${id}`);
export const createOrder = (order) => api.post(ORD_URL, order);
export const updateOrder = (id, order) => api.put(`${ORD_URL}/${id}`, order);
export const deleteOrder = (id) => api.delete(`${ORD_URL}/${id}`);

export const getAllCustomers = () => api.get(CUS_URL);
