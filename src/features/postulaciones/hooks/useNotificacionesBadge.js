import { useState, useEffect } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { obtenerMisJobs } from "/src/services/jobsServices/misJobsService.js";
import { obtenerPostulacionesPorJob } from "/src/services/jobsServices/postulacionesService.js";

export const useNotificacionesBadge = () => {
    const { token } = useAuth();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!token) return;
        const fetchCount = async () => {
            try {
                const misJobs = await obtenerMisJobs(token);
                const pendientes = misJobs.filter((j) => j.estado === "PENDIENTE");
                const resultados = await Promise.all(
                    pendientes.map((job) =>
                        obtenerPostulacionesPorJob(job.id, token).catch(() => [])
                    )
                );
                const total = resultados.reduce(
                    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
                    0
                );
                setCount(total);
            } catch {
                setCount(0);
            }
        };
        fetchCount();
    }, [token]);

    return count;
};
