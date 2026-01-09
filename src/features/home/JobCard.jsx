import { FiUser, FiClock } from "react-icons/fi";
import { tomarJob } from "/src/services/jobsServices/jobPublicService";
import { useAuth } from "/src/context/AuthContext.jsx";

import Swal from "sweetalert2";

const JobCard = ({ job, onTomar }) => {
    const { user, token } = useAuth();

    const isOwner = job.solicitanteCorreo === user?.email;
    const isAssigned = job.estado !== "PENDIENTE";
    const isDisabled = isOwner || isAssigned;

    const buttonText = isOwner
        ? "No disponible"
        : isAssigned
        ? "Job tomado"
        : "Tomar Job";

    const handleTomarJob = async () => {
        
        if (isDisabled) return;
        
        if (!token || !user) {
            Swal.fire({
                icon: "warning",
                title: "Sesión no válida",
                text: "Por favor inicia sesión nuevamente.",
            });
            return;
        }

        try {
            const result = await Swal.fire({
                title: "¿Tomar este Job?",
                text: "Al tomarlo, te convertirás en el prestador de servicio.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, tomar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#1e3a8a",
                cancelButtonColor: "#d33",

            });

            if (!result.isConfirmed) return;

            const response = await tomarJob(job.id, token);

            Swal.fire({
                icon: "success",
                title: "Job tomado 💼",
                text: "Ahora estás postulado a este trabajo.",
                timer: 1800,
                showConfirmButton: false
            });

            if (onTomar) onTomar(response);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No se pudo tomar el Job",
                text: "Intenta de nuevo más tarde.",
            });
        }
    };

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
                    
                    <FiClock /> Hace poco
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
            
            {/* Botón de tomar Job */}
            <button 
            type="button"
            disabled={isDisabled}
            onClick={handleTomarJob}
            className={`mt-4 w-full py-2 rounded-lg font-semibold transition
                        ${
                            isDisabled
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-[#1e3a8a] hover:bg-[#142a61] text-white"
                        }
                    `}>
                {buttonText}
            </button>
        </div>
    );
};

export default JobCard;
