import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // ✅ LÓGICA RESTAURADA: Usamos 'email' como pide tu backend
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ✅ POST a /auth/login con el objeto form { email, password }
            const response = await api.post("/auth/login", form);
            const data = response.data;

            const token = data.token || data.accessToken;
            if (!token) throw new Error("Token no recibido desde el backend.");

            const userData = data.user || data;

            // ✅ Guardar en contexto
            login(token, userData);

            Swal.fire({
                title: "✅ Bienvenido",
                text: "Autenticación exitosa. Cargando tu panel...",
                icon: "success",
                confirmButtonColor: "#6366F1",
                timer: 1500,
                showConfirmButton: false,
            });

            setTimeout(() => navigate("/"), 1600);
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            Swal.fire(
                "❌ Error",
                "Credenciales inválidas o el servidor no está disponible",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    EMS — Login
                </h1>

                {/* ✅ space-y-4 asegura el espaciado correcto entre inputs */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Campo EMAIL */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Campo PASSWORD con OJO */}
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {/* BOTÓN SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Iniciando...
                            </>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-500">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
