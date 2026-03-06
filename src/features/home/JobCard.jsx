import { FiUser, FiClock } from "react-icons/fi";
import { useJobCard } from "./hooks/useJobCard.js";
import { tiempoRelativo } from "../../utils/timeUtils.js";

import Button from "../../components/ui/Button.jsx";


const JobCard = ({ job, onTomar }) => {
    const { isDisabled, buttonText, handleTomarJob } = useJobCard(job, onTomar);

    console.log("fechaPublicacion:", job.fechaPublicacion);

    return (
        <div className="w-[300px] min-h-[380px] bg-white shadow-lg rounded-2xl p-5 border-4 border-black flex flex-col justify-between hover:scale-[1.02] transition">
            
            {/* Título */}
            <h2 className="text-xl font-bold text-[#1e3a8a] mb-2">
                {job.titulo}
            </h2>

            {/* Usuario */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FiUser className="text-lg" />
                <span>{job.solicitanteCorreo || "Usuario"}</span>
            </div>

            {/* Descripción */}
            <p className="text-gray-700 text-sm mt-3 line-clamp-4">
                {job.descripcion}
            </p>

            <div className="mt-4">
                <p className="font-bold text-[#1e3a8a]">{job.tipoPago}</p>
                <p className="font-bold text-black">${job.pago.toLocaleString()}</p>

                <p className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                    <FiClock /> {tiempoRelativo(job.fechaPublicacion)}
                </p>
            </div>

            <div className="mt-4">
                <p className="font-bold text-[#1e3a8a]">Ubicación</p>
                <p className="font-bold text-black">{job.ubicacion}</p>
            </div>

            <div className="mt-4">
                <p className="font-bold text-[#1e3a8a]">Estado</p>
                <p className="font-bold text-black">{job.estado}</p>
            </div>
            
            <Button
                variant={isDisabled ? "dark": "primary"}
                size="md"
                fullWidth
                onClick={handleTomarJob}
                className={`mt-4 ${isDisabled ? "!cursor-not-allowed" : ""}`}
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default JobCard;
