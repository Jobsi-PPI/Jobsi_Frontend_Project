import { FiUser, FiClock } from "react-icons/fi";
import { useJobCard } from "./hooks/useJobCard.js";
import { tiempoRelativo } from "../../utils/timeUtils.js";

import Button from "../../components/ui/Button.jsx";


const JobCard = ({ job, onTomar }) => {
    const { isDisabled, buttonText, handlePostularse } = useJobCard(job, onTomar);

    console.log("fechaPublicacion:", job.fechaPublicacion);

    return (
        <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            {/* Título */}
            <h2 className="text-lg font-bold leading-snug text-[#1e3a8a]">
                {job.titulo}
            </h2>

            {/* Usuario */}
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <FiUser className="text-sm" />
                <span className="truncate">{job.solicitanteCorreo || "Usuario"}</span>
            </div>

            {/* Descripción */}
            <p className="mt-3 line-clamp-4 text-sm text-gray-600">
                {job.descripcion}
            </p>

            {/* Pago y tiempo */}
            <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                    <span className="inline-flex rounded-full bg-[#fff4d6] px-2.5 py-0.5 text-xs font-semibold text-[#8a6200]">
                        {job.tipoPago}
                    </span>
                    <p className="mt-1 text-lg font-bold text-[#1e3a8a]">${job.pago.toLocaleString()}</p>
                </div>

                <p className="flex items-center gap-1.5 pb-1 text-xs text-gray-500">
                    <FiClock /> {tiempoRelativo(job.fechaPublicacion)}
                </p>
            </div>

            {/* Ubicación y estado */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Ubicación</p>
                    <p className="truncate text-sm font-semibold text-gray-800">{job.ubicacion}</p>
                </div>
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Estado</p>
                    <p className="truncate text-sm font-semibold text-gray-800">{job.estado}</p>
                </div>
            </div>

            <Button
                variant={isDisabled ? "dark": "primary"}
                size="md"
                fullWidth
                onClick={handlePostularse}
                className={`mt-4 !rounded-xl ${isDisabled ? "!cursor-not-allowed" : ""}`}
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default JobCard;
