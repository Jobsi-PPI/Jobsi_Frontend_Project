import { useState } from "react";
import Swal from "sweetalert2";

import { useAuth } from "../../../../context/AuthContext";
import { cambiarContrasena } from "../../../../services/usuariosService";

const MIN_LONGITUD = 8;
const VACIO = { actual: "", nueva: "", confirmar: "" };

export const useSeguridad = () => {
    const { token } = useAuth();
    const [campos, setCampos] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);

    const setCampo = (nombre) => (valor) => {
        setCampos((prev) => ({ ...prev, [nombre]: valor }));
        setErrores((prev) => ({ ...prev, [nombre]: undefined }));
    };

    const validar = () => {
        const nuevos = {};
        if (!campos.actual) nuevos.actual = "Ingresa tu contraseña actual.";
        if (campos.nueva.length < MIN_LONGITUD) nuevos.nueva = `Usa al menos ${MIN_LONGITUD} caracteres.`;
        else if (campos.nueva === campos.actual) nuevos.nueva = "La nueva contraseña debe ser distinta a la actual.";
        if (campos.confirmar !== campos.nueva) nuevos.confirmar = "Las contraseñas no coinciden.";
        setErrores(nuevos);
        return Object.keys(nuevos).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (enviando || !validar()) return;

        setEnviando(true);
        try {
            await cambiarContrasena(
                { contrasenaActual: campos.actual, contrasenaNueva: campos.nueva },
                token,
            );
            setCampos(VACIO);
            Swal.fire({
                icon: "success",
                title: "Contraseña actualizada",
                text: "Tu contraseña se cambió correctamente.",
                confirmButtonColor: "#1e3a8a",
            });
        } catch (error) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                setErrores({ actual: "La contraseña actual es incorrecta." });
            } else if (status === 400) {
                setErrores({ nueva: "La nueva contraseña no cumple la política de seguridad." });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo actualizar",
                    text: "Ocurrió un problema al cambiar tu contraseña. Intenta de nuevo más tarde.",
                    confirmButtonColor: "#1e3a8a",
                });
            }
        } finally {
            setEnviando(false);
        }
    };

    return { campos, errores, enviando, setCampo, handleSubmit };
};
