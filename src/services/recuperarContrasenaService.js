import api from "./apiService";

export const solicitarCodigo = async (correo) => {
    await api.post("/auth/password/forgot", { correo });
};

export const verificarCodigo = async (correo, codigo) => {
    const response = await api.post("/auth/password/verify-code", { correo, codigo });
    return response.data.tokenReset;
};

export const restablecerContrasena = async (tokenReset, contrasenaNueva) => {
    await api.post("/auth/password/reset", { tokenReset, contrasenaNueva });
};
