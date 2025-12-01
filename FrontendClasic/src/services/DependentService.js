import axios from "axios";

const API_URL = "http://localhost:9090/api/dependents";
const EMP_URL = "http://localhost:9090/api/employees";

export const getAllDependents = () => axios.get(API_URL);
export const getDependentById = (id) => axios.get(`${API_URL}/${id}`);
export const createDependent = (dependent) => axios.post(API_URL, dependent);
export const updateDependent = (id, dependent) => axios.put(`${API_URL}/${id}`, dependent);
export const deleteDependent = (id) => axios.delete(`${API_URL}/${id}`);

// Related data
export const getAllEmployees = () => axios.get(EMP_URL);
