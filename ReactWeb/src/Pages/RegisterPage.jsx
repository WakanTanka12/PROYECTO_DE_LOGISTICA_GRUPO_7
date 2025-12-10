import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "ROLE_USER"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", formData);
            Swal.fire("Success", "User registered successfully", "success");
            navigate("/login");
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Registration failed", "error");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
            <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
                {/* 🔹 CAMBIO: Color text-primary (Azul) para coincidir con Login */}
                <h2 className="text-center mb-4 text-primary">Create Account</h2>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                    <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label fw-bold">First Name</label>
                            <input type="text" name="firstName" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Last Name</label>
                            <input type="text" name="lastName" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>

                    <div>
                        <label className="form-label fw-bold">Username</label>
                        <input type="text" name="username" className="form-control" onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="form-label fw-bold">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>

                    {/* 🔹 CAMBIO: Botón btn-primary (Azul) */}
                    <button type="submit" className="btn btn-primary w-100 mt-3 py-2 fw-bold">
                        Register
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small>Already have an account? <Link to="/login">Login here</Link></small>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
