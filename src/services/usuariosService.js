import api from "./apiService";

export const obtenerPerfilUsuario = async (token) => {
    const response = await api.get("/v1/usuarios/perfil", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
