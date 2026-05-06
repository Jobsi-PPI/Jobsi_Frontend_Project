import api from "../apiService.js";

// Obtener todas las postulaciones recibidas en los jobs del usuario autenticado
export const obtenerPostulacionesRecibidas = async (token) => {
    const response = await api.get("/v1/postulaciones/recibidas", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Elegir un candidato para un job (lo asigna y cierra las demás postulaciones)
export const elegirCandidato = async (postulacionId, token) => {
    const response = await api.patch(`/v1/postulaciones/${postulacionId}/elegir`, null, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
