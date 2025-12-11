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

//Mostrar todos los jobs tomados por el usuario autenticado
export const obtenerJobsTomados = async (token) => {
    try {
        const response = await api.get("/v1/jobs/worked-by-me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo jobs tomados:", error);
        throw error;
    }
};

//Eliminar un job publicado por el usuario 
export const deleteJob = async (jobId, token) => {
    const response = await api.delete(`/v1/jobs/published/delete/${jobId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return true;
};

//Abandonar un job tomado por el usuario
export const abandonarJob = async (jobId, token) => {
    const response = await api.patch(`/v1/jobs/abandon/${jobId}`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
