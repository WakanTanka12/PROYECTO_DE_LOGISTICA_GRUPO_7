import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerList from "../components/Customer/CustomerList.jsx";
import CustomerForm from "../components/Customer/CustomerForm";

/**
 * EmployeePage — Gestiona rutas internas:
 * /employees, /employees/add, /employees/edit/:id
 */
const CustomerPage = () => {
    return (
        <Routes>
            <Route index element={<CustomerList />} />
            <Route path="add" element={<CustomerForm />} />
            <Route path="edit/:id" element={<CustomerForm />} />
        </Routes>
    );
};

export default CustomerPage;
