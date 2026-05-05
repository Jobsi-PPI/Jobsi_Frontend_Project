import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useModalState } from "../../../components/ui/modals/hooks/useModalState.js";

import Swal from "sweetalert2";

import Button from "../../../components/ui/Button.jsx";
import ComingSoonModal from "../../../components/ui/modals/ComingSoonModal";


const JobPublicadoCard = ({ job, onDelete }) => {

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
        <div className="bg-white p-6 rounded-3xl shadow flex flex-col gap-3 border-2 border-black">

            <h2 className="text-xl font-bold text-[#1e3a8a]">
                {job.titulo}
            </h2>

            <p className="text-gray-700">{job.descripcion}</p>


            <div className="mt-2">
                <p className="font-bold text-[#1e3a8a] ">{job.tipoPago}</p>
                <p className="text-lg font-semibold text-black">${job.pago.toLocaleString()}</p> {/* toLocaleString para formato de miles */}
            </div>

            <div className="mt-4">
                <p className="font-bold text-[#1e3a8a]">Ubicación</p>
                <p className="font-semibold text-black">{job.ubicacion}</p>
            </div>

            <div className="mt-2">
                <p className="font-bold text-[#1e3a8a]">Estado</p>
                <p className="font-semibold text-black">{job.estado}</p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-4">
                <Button
                    variant="warning"
                    size="md"
                    className="rounded-full"
                    onClick={() => openModal()}
                >
                    <FiEdit className="mr-2" /> Editar
                </Button>

                <Button
                    variant="dark"
                    size="md"
                    className="rounded-full"
                    onClick={handleDeleteClick}
                >
                    <FiTrash2 className="mr-2" /> Eliminar
                </Button>
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
        </div>  

        
    );
};

export default JobPublicadoCard;
