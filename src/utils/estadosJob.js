export const TODOS = "TODOS";

export const ESTADOS = {
    PENDIENTE: { label: "Pendiente", clases: "bg-amber-100 text-amber-800" },
    ASIGNADO: { label: "Asignado", clases: "bg-[#e6ecfb] text-[#1e3a8a]" },
    FINALIZADO: { label: "Finalizado", clases: "bg-green-100 text-green-800" },
};

// Un postulado nunca está PENDIENTE: ya tiene a alguien asignado
export const OPCIONES_FILTRO = {
    publicados: [TODOS, "PENDIENTE", "ASIGNADO", "FINALIZADO"],
    postulados: [TODOS, "ASIGNADO", "FINALIZADO"],
};

export const etiquetaEstado = (estado) =>
    estado === TODOS ? "Todos" : (ESTADOS[estado]?.label ?? estado);

export const filtrarPorEstado = (lista, estado) =>
    estado === TODOS ? lista : lista.filter((job) => job.estado === estado);