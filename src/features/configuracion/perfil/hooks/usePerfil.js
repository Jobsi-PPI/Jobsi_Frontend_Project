import { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../../../../services/usuariosService";
import { useAuth } from "../../../../context/AuthContext";
import { capitalizar } from "../../../../utils/formatUtils";

export const usePerfil = () => {
    const { user, token } = useAuth();
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

    const nombre = perfil?.nombre ?? user?.nombre ?? "—";
    const apellidos = [perfil?.primerApellido, perfil?.segundoApellido].filter(Boolean).join(" ");
    const genero = perfil?.genero ?? user?.genero;

    const datos = {
        nombre,
        apellidos: apellidos || "—",
        nombreCompleto: [nombre, apellidos].filter(Boolean).join(" "),
        correo: perfil?.correo ?? user?.email ?? "—",
        celular: perfil?.celular ?? "—",
        genero: genero ? capitalizar(genero) : "—",
        calificacion: perfil?.valoracionPromedio ?? null,
    };

    return { loading, datos };
};
