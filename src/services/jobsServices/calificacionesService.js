import api from "../apiService.js";

// Enviar calificación al finalizar un Job
export const calificarUsuario = async (data, token) => {
    const response = await api.post("/v1/calificaciones", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
