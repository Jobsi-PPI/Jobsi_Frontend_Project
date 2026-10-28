import { capitalizar } from "../../utils/formatUtils.js";
import { ESTADOS } from "../../utils/estadosJob.js";

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
