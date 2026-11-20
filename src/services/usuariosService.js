import api from "./apiService";

export const obtenerPerfilUsuario = async (token) => {
    const response = await api.get("/v1/usuarios/perfil", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const cambiarContrasena = async ({ contrasenaActual, contrasenaNueva }, token) => {
    await api.patch(
        "/v1/usuarios/cambiar-contrasena",
        { contrasenaActual, contrasenaNueva },
        { headers: { Authorization: `Bearer ${token}` } },
    );
};
