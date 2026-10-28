import { FiEdit2, FiTrash2, FiMapPin, FiCreditCard } from "react-icons/fi";
import { useModalState } from "../../../components/ui/modals/hooks/useModalState.js";
import { capitalizar, formatearPesos } from "../../../utils/formatUtils.js";

import Swal from "sweetalert2";

import Button from "../../../components/ui/Button.jsx";
import EstadoBadge from "../../../components/ui/EstadoBadge.jsx";
import InfoChip from "../../../components/ui/InfoChip.jsx";
import ComingSoonModal from "../../../components/ui/modals/ComingSoonModal";

// Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades
const botonContorno =
    "flex h-10 items-center justify-center gap-2 !rounded-lg !border !bg-white transition";


const JobPublicadoCard = ({ job, onDelete, onFinalizar }) => {

    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    const handleDeleteClick = async () => {
        const result = await Swal.fire({
                title: "Eliminar Job",
                text: "¿Estás seguro de que quieres eliminar este job?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1e3a8a",
                cancelButtonColor: "#d33",
                confirmButtonText: "Borrar",
                cancelButtonText: "Cancelar"
            });
        if (result.isConfirmed) {
            await onDelete(job.id);
            }
        };

    return (
        <article className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

            <EstadoBadge estado={job.estado} />

            <h3 className="text-lg font-bold text-gray-900">{job.titulo}</h3>

            <p className="text-sm text-gray-600">{job.descripcion}</p>

            <div className="flex flex-wrap gap-2">
                <InfoChip icon={FiMapPin}>{job.ubicacion}</InfoChip>
                <InfoChip icon={FiCreditCard}>{capitalizar(job.tipoPago)}</InfoChip>
            </div>

            <div className="flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
                <p className="text-2xl font-bold text-[#1e3a8a]">{formatearPesos(job.pago)}</p>

                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => openModal()}
                            className={`${botonContorno} !border-gray-200 !px-4 text-sm font-semibold !text-gray-700 hover:!bg-gray-50`}
                        >
                            <FiEdit2 className="h-4 w-4" /> Editar
                        </button>

                        <button
                            type="button"
                            aria-label="Eliminar Job"
                            onClick={handleDeleteClick}
                            className={`${botonContorno} w-10 !border-red-200 !p-0 !text-red-600 hover:!bg-red-50`}
                        >
                            <FiTrash2 className="h-4 w-4" />
                        </button>
                    </div>

                    {job.estado === "ASIGNADO" && (
                        <Button
                            variant="primary"
                            size="md"
                            className="!rounded-lg"
                            onClick={() => onFinalizar(job)}
                        >
                            Finalizar Job
                        </Button>
                    )}
                </div>
            </div>

            <ComingSoonModal
                isOpen={isOpen}
                onClose={closeModal}
                closing={closing}
                opening={opening}
                primaryAction={{
                    label: "Entendido",
                    onClick: closeModal
                }}
            />
        </article>
    );
};

export default JobPublicadoCard;
