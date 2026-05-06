import { useState, useEffect } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { obtenerPostulacionesRecibidas, elegirCandidato } from "/src/services/jobsServices/postulacionesService.js";
import Swal from "sweetalert2";

export const usePostulacionesRecibidas = () => {
    const { token } = useAuth();
    const [postulaciones, setPostulaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                await new Promise((r) => setTimeout(r, 2500));
                const data = await obtenerPostulacionesRecibidas(token);
                setPostulaciones(data);
            } catch {
                setPostulaciones([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [token]);

    const handleElegirCandidato = async (postulacionId) => {
        const result = await Swal.fire({
            title: "¿Elegir a este candidato?",
            text: "Se asignará a este estudiante tu Job y se notificará a los demás.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, elegirlo",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#1e3a8a",
            cancelButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            await elegirCandidato(postulacionId, token);

            // Al elegir un candidato el job queda asignado, se eliminan todas
            // las postulaciones de ese job de la lista local
            const seleccionada = postulaciones.find((p) => p.id === postulacionId);
            setPostulaciones((prev) =>
                prev.filter((p) => p.jobId !== seleccionada?.jobId)
            );

            Swal.fire({
                icon: "success",
                title: "¡Candidato elegido!",
                text: "El Job ha sido asignado exitosamente.",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch {
            Swal.fire({
                icon: "error",
                title: "No se pudo elegir el candidato",
                text: "Intenta de nuevo más tarde.",
            });
        }
    };

    // Agrupar postulaciones por job para mostrarlas en la UI
    const postulacionesPorJob = Object.values(
        postulaciones.reduce((acc, p) => {
            if (!acc[p.jobId]) {
                acc[p.jobId] = { jobId: p.jobId, jobTitulo: p.jobTitulo, candidatos: [] };
            }
            acc[p.jobId].candidatos.push(p);
            return acc;
        }, {})
    );

    return { loading, postulacionesPorJob, handleElegirCandidato };
};
