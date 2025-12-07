import api from "./apiService";  
// api tiene baseURL: "http://localhost:8080"

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
