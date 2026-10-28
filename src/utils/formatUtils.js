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
