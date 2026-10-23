import { FiUser, FiClock, FiMapPin, FiCreditCard } from "react-icons/fi";
import { useJobCard } from "./hooks/useJobCard.js";
import { tiempoRelativo } from "../../utils/timeUtils.js";

const formatLabel = (value = "") =>
    value
        .toString()
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/^\w/, (letra) => letra.toUpperCase());


const JobCard = ({ job, onTomar }) => {
    const { isDisabled, buttonText, handlePostularse } = useJobCard(job, onTomar);

    console.log("fechaPublicacion:", job.fechaPublicacion);

    return (
        <div className="flex h-full w-full flex-col rounded-2xl border border-[#e9edf3] bg-white p-5 shadow-sm transition hover:shadow-md">

            {/* Estado y tiempo */}
            <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-[#fdf1d6] px-3 py-1 text-xs font-semibold text-[#a16207]">
                    {formatLabel(job.estado)}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FiClock className="h-3.5 w-3.5" /> {tiempoRelativo(job.fechaPublicacion)}
                </span>
            </div>

            {/* Título y descripción */}
            <h2 className="mt-4 text-lg font-bold leading-snug text-[#1e2a4a]">
                {job.titulo}
            </h2>

            <p className="mt-1.5 line-clamp-3 text-sm text-gray-500">
                {job.descripcion}
            </p>

            {/* Ubicación y tipo de pago */}
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2fb] px-3 py-1 text-xs font-semibold text-[#1e3a8a]">
                    <FiMapPin className="h-3.5 w-3.5" /> {job.ubicacion}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2fb] px-3 py-1 text-xs font-semibold text-[#1e3a8a]">
                    <FiCreditCard className="h-3.5 w-3.5" /> {formatLabel(job.tipoPago)}
                </span>
            </div>

            {/* Usuario */}
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <FiUser className="h-3.5 w-3.5" />
                <span className="truncate">{job.solicitanteCorreo || "Usuario"}</span>
            </div>

            {/* Pago y acción */}
            <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                <p className="text-xl font-bold text-[#1e3a8a]">
                    ${job.pago.toLocaleString("es-CO")}
                </p>

                <button
                    type="button"
                    onClick={handlePostularse}
                    className={`shrink-0 !rounded-lg !border-0 !px-5 !py-2.5 text-sm font-semibold transition
                        ${isDisabled
                            ? "!cursor-not-allowed !bg-[#eef0f4] !text-gray-500"
                            : "!bg-[#1e3a8a] !text-white hover:!bg-[#1b347c]"
                        }`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default JobCard;
