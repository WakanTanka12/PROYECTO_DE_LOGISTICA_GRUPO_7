// src/api/packagesApi.js
import api from "./api";

const PKG_URL = "/packages";
const ORD_URL = "/orders";

export const getAllPackages = () => api.get(PKG_URL);
export const getPackageById = (id) => api.get(`${PKG_URL}/${id}`);
export const createPackage = (pkg) => api.post(PKG_URL, pkg);
export const updatePackage = (id, pkg) => api.put(`${PKG_URL}/${id}`, pkg);
export const deletePackage = (id) => api.delete(`${PKG_URL}/${id}`);

// por order
export const getPackagesByOrder = (orderId) => api.get(`${ORD_URL}/${orderId}/packages`);
export const createPackageForOrder = (orderId, pkg) =>
    api.post(`${ORD_URL}/${orderId}/packages`, pkg);
