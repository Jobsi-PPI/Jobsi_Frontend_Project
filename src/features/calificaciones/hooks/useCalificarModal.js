import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { useModalState } from "/src/components/ui/modals/hooks/useModalState.js";
import { finalizarJob } from "/src/services/jobsServices/misJobsService.js";
import Swal from "sweetalert2";

const CATEGORIAS = ["Calidad", "Puntualidad", "Comunicacion", "Profesionalismo", "Recomendacion"];
const puntuacionesVacias = () => Object.fromEntries(CATEGORIAS.map((c) => [c, 0]));

export const useCalificarModal = () => {
    const { token } = useAuth();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    const [puntuaciones, setPuntuaciones] = useState(puntuacionesVacias());
    const [hover, setHover] = useState(puntuacionesVacias());
    const [comentario, setComentario] = useState("");
    const [jobActual, setJobActual] = useState(null);
    const [onExitoCallback, setOnExitoCallback] = useState(null);

    const abrirModal = (job, onExito) => {
        setJobActual(job);
        setOnExitoCallback(() => onExito);
        setPuntuaciones(puntuacionesVacias());
        setHover(puntuacionesVacias());
        setComentario("");
        openModal();
    };

    const handleCerrar = () => closeModal();

    const setPuntuacionCategoria = (categoria, valor) =>
        setPuntuaciones((prev) => ({ ...prev, [categoria]: valor }));

    const setHoverCategoria = (categoria, valor) =>
        setHover((prev) => ({ ...prev, [categoria]: valor }));

    const handleSubmit = async () => {
        const sinCalificar = CATEGORIAS.filter((c) => puntuaciones[c] === 0);
        if (sinCalificar.length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Calificación incompleta",
                text: "Debes calificar todas las categorías antes de finalizar.",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        const puntuacionesArray = CATEGORIAS.map((c) => ({
            categoria: c,
            puntuacion: puntuaciones[c],
        }));

        try {
            await finalizarJob(jobActual.id, puntuacionesArray, comentario, token);

            Swal.fire({
                icon: "success",
                title: "¡Job finalizado!",
                text: "La calificación fue enviada correctamente.",
                timer: 1800,
                showConfirmButton: false,
            });

            if (onExitoCallback) onExitoCallback();
            closeModal();
        } catch {
            Swal.fire({
                icon: "error",
                title: "No se pudo finalizar el Job",
                text: "Intenta de nuevo más tarde.",
            });
        }
    };

    return {
        isOpen, closing, opening,
        puntuaciones, setPuntuacionCategoria,
        hover, setHoverCategoria,
        comentario, setComentario,
        jobActual,
        categorias: CATEGORIAS,
        abrirModal, handleCerrar, handleSubmit,
    };
};
