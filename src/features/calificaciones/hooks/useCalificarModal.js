import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { useModalState } from "/src/components/ui/modals/hooks/useModalState.js";
import { calificarUsuario } from "/src/services/jobsServices/calificacionesService.js";
import Swal from "sweetalert2";

export const useCalificarModal = () => {
    const { token } = useAuth();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    const [puntuacion, setPuntuacion] = useState(0);
    const [hover, setHover] = useState(0);
    const [comentario, setComentario] = useState("");
    const [jobActual, setJobActual] = useState(null);
    const [rolCalificador, setRolCalificador] = useState(null);
    const [onExitoCallback, setOnExitoCallback] = useState(null);

    const abrirModal = (job, rol, onExito) => {
        setJobActual(job);
        setRolCalificador(rol);
        setOnExitoCallback(() => onExito);
        setPuntuacion(0);
        setHover(0);
        setComentario("");
        openModal();
    };

    const handleCerrar = () => {
        closeModal();
    };

    const handleSubmit = async () => {
        if (puntuacion === 0) {
            Swal.fire({
                icon: "warning",
                title: "Selecciona una puntuación",
                text: "Debes elegir entre 1 y 5 estrellas para calificar.",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        const calificadoCorreo =
            rolCalificador === "dueno"
                ? jobActual?.trabajadorCorreo
                : jobActual?.solicitanteCorreo;

        try {
            await calificarUsuario(
                { jobId: jobActual.id, calificadoCorreo, puntuacion, comentario },
                token
            );

            Swal.fire({
                icon: "success",
                title: "¡Calificación enviada!",
                text: "Gracias por tu valoración.",
                timer: 1800,
                showConfirmButton: false,
            });

            if (onExitoCallback) onExitoCallback();
            closeModal();
        } catch {
            Swal.fire({
                icon: "error",
                title: "No se pudo enviar la calificación",
                text: "Intenta de nuevo más tarde.",
            });
        }
    };

    const calificadoLabel =
        rolCalificador === "dueno" ? "al trabajador" : "al solicitante";

    return {
        isOpen, closing, opening,
        puntuacion, setPuntuacion,
        hover, setHover,
        comentario, setComentario,
        jobActual, calificadoLabel,
        abrirModal, handleCerrar, handleSubmit,
    };
};
