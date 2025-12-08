import api from "../apiService.js";
const API_URL = "http://localhost:8080/v1";

//Crear un nuevo job público
export const crearJob = async (data, token) => {
const response = await fetch(`${API_URL}/jobs/create`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // obligatorio
    },
    body: JSON.stringify(data),
});

if (!response.ok) {
    const text = await response.text();
    console.error("Error backend:", text);
    throw new Error("Error creando el Job");
}

return response.json();
};

//Mostrar todos los jobs publicos
export const obtenerJobs = async () => {
    const response = await api.get("/v1/public/all-jobs");
    return response.data;
};


//Tomar un job público por su ID
export const tomarJob = async (jobId, token) => {
    const response = await api.patch(`/v1/jobs/take-job/${jobId}`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
};
