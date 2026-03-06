import { useAuth } from "/src/context/AuthContext.jsx";
import { tomarJob } from "/src/services/jobsServices/jobPublicService";
import Swal from "sweetalert2";

export const useJobCard = (job, onTomar) => {
    const { user, token } = useAuth();

    const isOwner = job.solicitanteCorreo === user?.email;
    const isAssigned = job.estado !== "PENDIENTE";
    const isDisabled = isOwner || isAssigned;

    const buttonText = isOwner
        ? "No disponible"
        : isAssigned
        ? "Job tomado"
        : "Tomar Job";

    const handleTomarJob = async () => {
        if (isDisabled) return;

        if (!token || !user) {
            Swal.fire({
                icon: "warning",
                title: "Sesión no válida",
                text: "Por favor inicia sesión nuevamente.",
            });
            return;
        }

        try {
            const result = await Swal.fire({
                title: "¿Tomar este Job?",
                text: "Al tomarlo, te convertirás en el prestador de servicio.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, tomar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#1e3a8a",
                cancelButtonColor: "#d33",
            });

            if (!result.isConfirmed) return;

            const response = await tomarJob(job.id, token);

            Swal.fire({
                icon: "success",
                title: "Job tomado 💼",
                text: "Ahora estás postulado a este trabajo.",
                timer: 1800,
                showConfirmButton: false,
            });

            if (onTomar) onTomar(response);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No se pudo tomar el Job",
                text: "Intenta de nuevo más tarde.",
            });
        }
    };

    return { isDisabled, buttonText, handleTomarJob };
};