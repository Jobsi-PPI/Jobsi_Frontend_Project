import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const JobPublicadoCard = ({ job, onDelete }) => {

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
        <div className="bg-white p-6 rounded-3xl shadow flex flex-col gap-3">

            <h2 className="text-xl font-bold text-[#1e3a8a]">
                {job.titulo}
            </h2>

            <p className="text-gray-700">{job.descripcion}</p>


            <div className="mt-2">
                <p className="font-semibold text-[#1e3a8a]">Efectivo</p>
                <p className="text-lg font-bold text-[#1e3a8a]">${job.pago.toLocaleString()}</p>
            </div>

            <div className="mt-2">
                <p className="font-semibold text-[#1e3a8a]">Tiempo límite</p>
                <p className="font-bold text-black">{job.fechaLimite}</p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-4">
                <button className="px-6 py-2 btn-amarillo text-black font-semibold rounded-full flex items-center gap-2"
                type="button"
               /*  onClick={} */ >
                    <FiEdit className="text-black-600" />Editar
                </button>

                <button className="px-6 py-2 bg-[#0a0f1a] text-white font-semibold rounded-full flex items-center gap-2"
                type="button"
                onClick={handleDeleteClick}
                    >                     
                    <FiTrash2 /> Eliminar
                </button>
            </div>
        </div>
    );
};

export default JobPublicadoCard;
