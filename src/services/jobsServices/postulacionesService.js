import api from "../apiService.js";

// Obtener los postulantes recibidos para un job específico
export const obtenerPostulacionesPorJob = async (jobId, token) => {
    const response = await api.get(`/v1/requests/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Elegir un candidato para un job (lo asigna y cierra las demás postulaciones)
export const elegirCandidato = async (jobId, solicitudId, token) => {
    const response = await api.patch(`/v1/jobs/apply-job/${jobId}?solicitudId=${solicitudId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
