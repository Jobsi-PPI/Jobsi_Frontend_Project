import { capitalizar } from "../../utils/formatUtils.js";

const ESTADOS = {
    PENDIENTE: { label: "Pendiente", clases: "bg-amber-100 text-amber-800" },
    ASIGNADO: { label: "Asignado", clases: "bg-[#e6ecfb] text-[#1e3a8a]" },
    FINALIZADO: { label: "Finalizado", clases: "bg-green-100 text-green-800" },
};

const EstadoBadge = ({ estado }) => {
    if (!estado) return null;

    const { label, clases } = ESTADOS[estado] ?? {
        label: capitalizar(estado),
        clases: "bg-gray-100 text-gray-600",
    };

    return (
        <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${clases}`}>
            {label}
        </span>
    );
};

export default EstadoBadge;
