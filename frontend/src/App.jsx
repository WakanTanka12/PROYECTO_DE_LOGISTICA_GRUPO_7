import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import LoginPage from "./components/Auth/LoginPage.jsx";
import Home from "./Pages/Home.jsx";
import CustomerPage from "./Pages/CustomerPage.jsx";


/**
 * MainLayout
 * Mantiene la estructura general: header + contenido + footer.
 * El <Outlet /> representa las rutas internas (Department, Employee, etc.)
 */

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                {/* 🧩 ErrorBoundary captura cualquier fallo en renderizado */}
                <ErrorBoundary>
                    <Router>
                        <Routes>
                            {/* 🔓 Public route (Login) */}
                            <Route path="/login" element={<LoginPage />} />

                            {/* 🔐 Private routes under MainLayout */}
                            <Route element={<MainLayout />}>
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <Home />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="customers/*"
                                    element={
                                        <PrivateRoute>
                                            <CustomerPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Redirect unknown paths to home */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Route>
                        </Routes>
                    </Router>
                </ErrorBoundary>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
