import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const capitalizar = (texto = "") =>
    texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

export const formatearPesos = (valor) => `$${Number(valor).toLocaleString("es-CO")}`;

export const formatearFechaCorta = (fecha) => {
    if (!fecha) return "";

    const parsed = parseISO(fecha);
    return isValid(parsed) ? format(parsed, "d MMM yyyy", { locale: es }) : fecha;
};

// En la mitad exacta se redondea hacia abajo (4.5 → 4 estrellas), como en el diseño
export const estrellasLlenas = (valor) => Math.min(5, Math.max(0, Math.ceil(valor - 0.5)));
