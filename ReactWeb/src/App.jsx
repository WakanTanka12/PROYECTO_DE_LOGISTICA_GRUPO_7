import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import CustomerPage from "./pages/CustomerPage";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import DriverPage from "./pages/DriverPage.jsx";
import OrderPackagePage from "./pages/OrderPackagesPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import PackagesPage from "./pages/PackagePage.jsx";
import RoutePage from "./pages/RoutePage.jsx";


import "./index.css";

/**
 * 🚀 App.jsx — Enrutador principal
 * -----------------------------------------------------
 * ✔ Define rutas públicas (login, register)
 * ✔ Protege el resto con ProtectedRoute
 * ✔ Evita parpadeo infinito al cargar sesión
 */
export default function App() {
    return (
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <Routes>
                        {/* 🔓 RUTAS PÚBLICAS */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* 🔒 RUTAS PROTEGIDAS */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <MainLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="customers/*" element={<CustomerPage />} />
                            <Route path="deliveries/*" element={<DeliveryPage />} />
                            <Route path="drivers/*" element={<DriverPage />} />
                            <Route path="orderpackages/*" element={<OrderPackagePage />} />
                            <Route path="orders/*" element={<OrderPage />} />
                            <Route path="packages/*" element={<PackagesPage />} />
                            <Route path="routes/*" element={<RoutePage />} />
                            <Route path="settings" element={<div>Settings Page placeholder</div>}></Route>
                        </Route>

                        {/* 🚦 Redirección general */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}
