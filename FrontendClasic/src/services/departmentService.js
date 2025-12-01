import api from "./api.js"

const API_URL = "http://localhost:9090/api/departments";

export const getAllDepartments = () => api.get(API_URL);
export const getDepartmentById = (id) => api.get(`${API_URL}/${id}`);
export const createDepartment = (department) => api.post(API_URL, department);
export const updateDepartment = (id, department) => api.put(`${API_URL}/${id}`, department);
export const deleteDepartment = (id) => api.delete(`${API_URL}/${id}`);
