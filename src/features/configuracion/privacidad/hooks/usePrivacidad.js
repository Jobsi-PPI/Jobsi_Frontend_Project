import { useState } from "react";

// Provisional: las preferencias viven solo en memoria hasta que el backend exponga GET/PATCH /v1/usuarios/preferencias
const INICIALES = {
    mostrarCelular: true,
    mostrarCalificacion: true,
    mostrarCorreo: false,
    notificarPostulaciones: true,
    correosJobsi: false,
};

export const usePrivacidad = () => {
    const [preferencias, setPreferencias] = useState(INICIALES);

    const alternar = (id) => setPreferencias((prev) => ({ ...prev, [id]: !prev[id] }));

    return { preferencias, alternar };
};
