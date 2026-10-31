import { FiUser, FiClock, FiCreditCard } from "react-icons/fi";
import Swal from "sweetalert2";
import { capitalizar, formatearFechaCorta, formatearPesos } from "../../../utils/formatUtils.js";

import EstadoBadge from "../../../components/ui/EstadoBadge.jsx";
import InfoChip from "../../../components/ui/InfoChip.jsx";

const JobPostuladoCard = ({ job, onAbandoned }) => {

    const handleAbandonarClick = async () => {
        const result = await Swal.fire({
                title: "Abandonar Job",
                text: "¿Estás seguro de que quieres abandonar este job?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1e3a8a",
                cancelButtonColor: "#d33",
                confirmButtonText: "Abandonar",
                cancelButtonText: "Cancelar"
            });
        if (result.isConfirmed) {
            await onAbandoned(job.id);
            }
    };

    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between md:gap-8">

            <div className="flex min-w-0 flex-col items-start gap-3 md:flex-1">
                <EstadoBadge estado={job.estado} />

                <h3 className="text-lg font-bold text-gray-900">{job.titulo}</h3>

                <p className="text-sm text-gray-600">{job.descripcion}</p>

                <p className="flex min-w-0 max-w-full items-center gap-2 text-sm text-gray-600">
                    <FiUser className="h-4 w-4 shrink-0" />
                    <span className="truncate">Solicitado por {job.solicitanteCorreo}</span>
                </p>

                <div className="flex flex-wrap gap-2">
                    {job.fechaLimite && (
                        <InfoChip icon={FiClock}>Límite: {formatearFechaCorta(job.fechaLimite)}</InfoChip>
                    )}
                    <InfoChip icon={FiCreditCard}>{capitalizar(job.tipoPago)}</InfoChip>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3
            md:shrink-0 md:flex-col md:items-end md:justify-center md:gap-6 md:border-t-0 md:pt-0">
                <p className="text-2xl font-bold text-[#1e3a8a]">{formatearPesos(job.pago)}</p>

                {/* Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer */}
                {job.estado !== "FINALIZADO" && (
                    <button
                        type="button"
                        onClick={handleAbandonarClick}
                        className="flex h-10 items-center justify-center !rounded-lg !border !border-red-200 !bg-white !px-4 text-sm font-bold !text-red-600 transition hover:!bg-red-50"
                    >
                        Abandonar
                    </button>
                )}
            </div>
        </article>
    );
};

export default JobPostuladoCard;
