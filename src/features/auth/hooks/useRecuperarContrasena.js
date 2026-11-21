import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
    solicitarCodigo,
    verificarCodigo,
    restablecerContrasena,
} from "../../../services/recuperarContrasenaService";

export const LONGITUD_CODIGO = 6;
export const MIN_CONTRASENA = 8;

// Supuestos pendientes de confirmar con el backend
const VIGENCIA_CODIGO_SEG = 20 * 60;
const ESPERA_REENVIO_SEG = 60;

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const enmascararCorreo = (correo) => {
    const [local = "", dominio = ""] = correo.split("@");
    return `${local.slice(0, local.length > 2 ? 2 : 1)}••@${dominio}`;
};

const avisarError = (text) =>
    Swal.fire({ icon: "error", title: "Algo salió mal", text, confirmButtonColor: "#1e3a8a" });

export const useRecuperarContrasena = () => {
    const navigate = useNavigate();

    const [paso, setPaso] = useState(1);
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [tokenReset, setTokenReset] = useState("");
    const [nueva, setNueva] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [segundosVigencia, setSegundosVigencia] = useState(0);
    const [segundosEspera, setSegundosEspera] = useState(0);

    useEffect(() => {
        if (paso !== 2) return;
        const id = setInterval(() => {
            setSegundosVigencia((s) => Math.max(0, s - 1));
            setSegundosEspera((s) => Math.max(0, s - 1));
        }, 1000);
        return () => clearInterval(id);
    }, [paso]);

    const iniciarTemporizadores = () => {
        setSegundosVigencia(VIGENCIA_CODIGO_SEG);
        setSegundosEspera(ESPERA_REENVIO_SEG);
    };

    const limpiarError = (campo) => setErrores((prev) => ({ ...prev, [campo]: undefined }));

    const cambiarCorreo = (valor) => { setCorreo(valor); limpiarError("correo"); };
    const cambiarCodigo = (valor) => { setCodigo(valor); limpiarError("codigo"); };
    const cambiarNueva = (valor) => { setNueva(valor); limpiarError("nueva"); };
    const cambiarConfirmar = (valor) => { setConfirmar(valor); limpiarError("confirmar"); };

    const enviarCorreo = async (e) => {
        e.preventDefault();
        if (enviando) return;

        const correoLimpio = correo.trim();
        if (!EMAIL_VALIDO.test(correoLimpio)) {
            setErrores({ correo: "Escribe un correo válido." });
            return;
        }

        setEnviando(true);
        try {
            await solicitarCodigo(correoLimpio);
            setCorreo(correoLimpio);
            setCodigo("");
            setErrores({});
            iniciarTemporizadores();
            setPaso(2);
        } catch {
            avisarError("No pudimos enviar el código. Intenta de nuevo en unos minutos.");
        } finally {
            setEnviando(false);
        }
    };

    const verificar = async (e) => {
        e.preventDefault();
        if (enviando || segundosVigencia === 0) return;

        if (codigo.length < LONGITUD_CODIGO) {
            setErrores({ codigo: "Ingresa los 6 dígitos del código." });
            return;
        }

        setEnviando(true);
        try {
            setTokenReset(await verificarCodigo(correo, codigo));
            setErrores({});
            setPaso(3);
        } catch (error) {
            if (error.response?.status === 400) {
                setErrores({ codigo: "El código es incorrecto o ya venció." });
            } else {
                avisarError("No pudimos verificar el código. Intenta de nuevo.");
            }
        } finally {
            setEnviando(false);
        }
    };

    const reenviar = async () => {
        if (enviando || segundosEspera > 0) return;

        setEnviando(true);
        try {
            await solicitarCodigo(correo);
            setCodigo("");
            setErrores({});
            iniciarTemporizadores();
            Swal.fire({
                toast: true,
                position: "top",
                icon: "success",
                title: "Te enviamos un nuevo código",
                showConfirmButton: false,
                timer: 2500,
            });
        } catch {
            avisarError("No pudimos reenviar el código. Intenta de nuevo en unos minutos.");
        } finally {
            setEnviando(false);
        }
    };

    const restablecer = async (e) => {
        e.preventDefault();
        if (enviando) return;

        const nuevos = {};
        if (nueva.length < MIN_CONTRASENA) nuevos.nueva = `Usa al menos ${MIN_CONTRASENA} caracteres.`;
        if (confirmar !== nueva) nuevos.confirmar = "Las contraseñas no coinciden.";
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;

        setEnviando(true);
        try {
            await restablecerContrasena(tokenReset, nueva);
            await Swal.fire({
                icon: "success",
                title: "Contraseña actualizada",
                text: "Ya puedes iniciar sesión con tu nueva contraseña.",
                confirmButtonColor: "#1e3a8a",
                confirmButtonText: "Ir a iniciar sesión",
            });
            navigate("/login", { replace: true });
        } catch (error) {
            if (error.response?.status === 400) {
                setErrores({ nueva: "No cumple la política de seguridad o tu verificación venció. Vuelve a empezar." });
            } else {
                avisarError("No pudimos cambiar tu contraseña. Intenta de nuevo.");
            }
        } finally {
            setEnviando(false);
        }
    };

    // El código es de un solo uso: desde el paso 3 se vuelve al inicio para pedir uno nuevo
    const volver = () => {
        setErrores({});
        if (paso === 1) {
            navigate("/login");
            return;
        }
        setCodigo("");
        setTokenReset("");
        setNueva("");
        setConfirmar("");
        setPaso(1);
    };

    return {
        paso, correo, codigo, nueva, confirmar, errores, enviando,
        segundosVigencia, segundosEspera,
        cambiarCorreo, cambiarCodigo, cambiarNueva, cambiarConfirmar,
        enviarCorreo, verificar, reenviar, restablecer, volver,
    };
};
