import { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../../../services/usuariosService";
import { useAuth } from "../../../context/AuthContext";

export const usePerfil = () => {
    const { token } = useAuth();
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const cargarPerfil = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    obtenerPerfilUsuario(token).then(setPerfil),
                    new Promise(resolve => setTimeout(resolve, 2500)),
                ]);
            } catch {
                // Backend aún no disponible; se usa el fallback de AuthContext
            } finally {
                setLoading(false);
            }
        };
        cargarPerfil();
    }, [token]);

    return { perfil, loading };
};
