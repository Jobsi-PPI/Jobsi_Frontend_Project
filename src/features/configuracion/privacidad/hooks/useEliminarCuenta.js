import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../../../context/AuthContext";
import { eliminarCuenta } from "../../../../services/usuariosService";

export const useEliminarCuenta = (onCerrar) => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const cambiarContrasena = (valor) => {
        setContrasena(valor);
        setError("");
    };

    const cerrar = () => {
        if (enviando) return;
        setContrasena("");
        setError("");
        onCerrar();
    };

    const confirmar = async (e) => {
        e.preventDefault();
        if (enviando) return;

        if (!contrasena) {
            setError("Ingresa tu contraseña para confirmar.");
            return;
        }

        setEnviando(true);
        try {
            await eliminarCuenta(contrasena, token);
            logout();
            await Swal.fire({
                icon: "success",
                title: "Cuenta eliminada",
                text: "Tu cuenta y sus datos fueron eliminados.",
                confirmButtonColor: "#1e3a8a",
            });
            navigate("/login", { replace: true });
        } catch (err) {
            const status = err.response?.status;
            if (status === 401 || status === 403) {
                setError("La contraseña es incorrecta.");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo eliminar la cuenta",
                    text: "Ocurrió un problema. Intenta de nuevo más tarde.",
                    confirmButtonColor: "#1e3a8a",
                });
            }
        } finally {
            setEnviando(false);
        }
    };

    return { contrasena, error, enviando, cambiarContrasena, cerrar, confirmar };
};
