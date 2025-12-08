import api from "../apiService";   // api baseURL de springboot: "http://localhost:8080"

//Mostrar todos los jobs publicados por el usuario autenticado
export const obtenerMisJobs = async (token) => {
    try {
        const response = await api.get("/v1/jobs/posted-by-me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error obteniendo mis jobs:", error);
        throw error;
    }
};

export const deleteJob = async (jobId, token) => {
    const response = await api.delete(`/v1/jobs/published/delete/${jobId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return true;
};
