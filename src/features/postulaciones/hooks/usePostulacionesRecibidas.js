import { useState, useEffect } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { obtenerPostulacionesPorJob, elegirCandidato } from "/src/services/jobsServices/postulacionesService.js";
import { obtenerMisJobs } from "/src/services/jobsServices/misJobsService.js";
import Swal from "sweetalert2";

export const usePostulacionesRecibidas = () => {
    const { token } = useAuth();
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                await new Promise((r) => setTimeout(r, 2500));
                const misJobs = await obtenerMisJobs(token);
                const pendientes = misJobs.filter((j) => j.estado === "PENDIENTE");

                const resultados = await Promise.all(
                    pendientes.map(async (job) => {
                        const candidatos = await obtenerPostulacionesPorJob(job.id, token).catch(() => []);
                        return {
                            jobId: job.id,
                            jobTitulo: job.titulo,
                            jobPago: job.pago,
                            jobTipoPago: job.tipoPago,
                            jobUbicacion: job.ubicacion,
                            candidatos: Array.isArray(candidatos) ? candidatos : [],
                        };
                    })
                );

                setGrupos(resultados.filter((g) => g.candidatos.length > 0));
            } catch {
                setGrupos([]);
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
            const grupo = grupos.find((g) => g.candidatos.some((c) => c.solicitudId === postulacionId));
            await elegirCandidato(grupo?.jobId, postulacionId, token);

            setGrupos((prev) => prev.filter((g) => g.jobId !== grupo?.jobId));

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

    return { loading, postulacionesPorJob: grupos, handleElegirCandidato };
};
