import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { postularseAJob } from "/src/services/jobsServices/jobPublicService";
import Swal from "sweetalert2";

export const useJobCard = (job, onPostulacion) => {
    const { user, token } = useAuth();
    const [hasApplied, setHasApplied] = useState(false);

    const isOwner = job.solicitanteCorreo === user?.email;
    const isClosed = job.estado !== "PENDIENTE";
    const alreadyApplied = hasApplied || job.yaPostulado === true;
    const isDisabled = isOwner || isClosed || alreadyApplied;

    const buttonText = isOwner
        ? "No disponible"
        : isClosed
        ? "Cerrado"
        : alreadyApplied
        ? "Ya postulado"
        : "Postularse";

    const handlePostularse = async () => {
        if (isDisabled) return;

        if (!token || !user) {
            Swal.fire({
                icon: "warning",
                title: "Sesión no válida",
                text: "Por favor inicia sesión nuevamente.",
            });
            return;
        }

        const result = await Swal.fire({
            title: "¿Postularse a este Job?",
            text: "Le enviarás tu perfil al publicador para que te evalúe.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, postularme",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#1e3a8a",
            cancelButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await postularseAJob(job.id, token);
            setHasApplied(true);

            Swal.fire({
                icon: "success",
                title: "¡Postulación enviada!",
                text: "El publicador revisará tu solicitud y se pondrá en contacto.",
                timer: 2000,
                showConfirmButton: false,
            });

            if (onPostulacion) onPostulacion(response);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No se pudo enviar la postulación",
                text: "Intenta de nuevo más tarde.",
            });
        }
    };

    return { isDisabled, buttonText, handlePostularse };
};
