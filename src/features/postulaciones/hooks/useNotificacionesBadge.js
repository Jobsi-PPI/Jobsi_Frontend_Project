import { useState, useEffect } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { obtenerPostulacionesRecibidas } from "/src/services/jobsServices/postulacionesService.js";

export const useNotificacionesBadge = () => {
    const { token } = useAuth();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!token) return;
        const fetchCount = async () => {
            try {
                const data = await obtenerPostulacionesRecibidas(token);
                setCount(Array.isArray(data) ? data.length : 0);
            } catch {
                setCount(0);
            }
        };
        fetchCount();
    }, [token]);

    return count;
};
