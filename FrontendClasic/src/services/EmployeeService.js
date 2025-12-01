import api from "./api.js"

const API_URL = "http://localhost:9090/api/employees";
const DEPT_URL = "http://localhost:9090/api/departments";
const SKILL_URL = "http://localhost:9090/api/skills";
const DEPENDENT_URL = "http://localhost:9090/api/dependents";

export const getAllEmployees = () => api.get(API_URL);
export const getEmployeeById = (id) => api.get(`${API_URL}/${id}`);
export const createEmployee = (employee) => api.post(API_URL, employee);
export const updateEmployee = (id, employee) => api.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`${API_URL}/${id}`);

// Related data
export const getAllDepartments = () => api.get(DEPT_URL);
export const getDependentsByEmployee = (id) => api.get(`${DEPENDENT_URL}/byEmployee/${id}`);
