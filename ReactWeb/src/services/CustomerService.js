import api from "./api";

const CUSTOMER_BASE_URL = '/customers';

//Acceder al API de listar todos los empleados
export const getAllCustomers =
    ()=> api.get(CUSTOMER_BASE_URL);

//Llamar al Back-End al API que elimina un empleado
export const deleteCustomer =
    (customerID) =>
        api.delete(CUSTOMER_BASE_URL+'/'+customerID);

//Llamar al API del Back-End que nos permita agregar un Empleado
export const addCustomer =
    (customer) => api.post(CUSTOMER_BASE_URL, customer);

//Llamar al API del Back-End que nos permita actualizar a un EMPLEADO
export const updateCustomer =
    (customerID,customer) =>
        api.put(CUSTOMER_BASE_URL+'/'+customerID,customer);

//Llamar al API que nos traiga un empleado
export const getCustomer =
    (customerID) => api.get(CUSTOMER_BASE_URL+'/'+customerID);
