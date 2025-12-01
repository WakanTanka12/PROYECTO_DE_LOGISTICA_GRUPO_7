import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "../components/Employee/EmployeeList";
import EmployeeForm from "../components/Employee/EmployeeForm";

const EmployeePage = () => {
    return (
        <Routes>
            {/* Cuando la ruta es /employees exacto, muestra la lista */}
            <Route index element={<EmployeeList />} />

            {/* Cuando la ruta es /employees/add, muestra el formulario */}
            <Route path="add" element={<EmployeeForm />} />

            {/* Cuando la ruta es /employees/edit/1, muestra el formulario con ID */}
            <Route path="edit/:id" element={<EmployeeForm />} />
        </Routes>
    );
};

export default EmployeePage;