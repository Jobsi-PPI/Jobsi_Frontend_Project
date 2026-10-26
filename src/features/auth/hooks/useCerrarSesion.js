import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../../context/AuthContext.jsx";

/**
 * useCerrarSesion
 * Pide confirmación con SweetAlert2 y, si el usuario acepta, cierra la sesión y lo manda al login.
 *
 * @returns {function} Función asíncrona que se llama desde cualquier opción "Cerrar sesión"
 */
export const useCerrarSesion = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return async () => {
        const result = await Swal.fire({
            title: "Cerrar sesión",
            text: "¿Estás seguro de que quieres cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e3a8a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            logout();
            navigate("/login", { replace: true });
        }
    };
};
