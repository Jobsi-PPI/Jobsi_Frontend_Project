import { FiUser } from "react-icons/fi";
import { TbDoorExit } from "react-icons/tb";
import Swal from "sweetalert2";

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
        <div className="bg-white p-6 rounded-3xl shadow flex flex-col gap-3 border-2 border-black">

            <h2 className="text-xl font-bold text-[#1e3a8a]">
                {job.titulo}
            </h2>


            <p className="text-gray-700 flex items-center gap-2 whitespace-nowrap">
                <span>Solicitado por:</span>
                <FiUser className="text-lg" />
                <span className="ml-1">{job.solicitanteCorreo}</span>
            </p>

            <p className="text-gray-700">{job.descripcion}</p>
            

            <div className="mt-2">
                <p className="font-bold text-[#1e3a8a]">{job.tipoPago}</p>
                <p className="text-lg font-semibold text-[#1e3a8a]">${job.pago.toLocaleString()}</p> {/* toLocaleString para formato de miles */}
            </div>

            <div className="mt-2">
                <p className="font-semibold text-[#1e3a8a]">Tiempo límite</p>
                <p className="font-bold text-black">{job.fechaLimite}</p>
            </div>

            {/* Botón de abandonar */}
            <div className="flex gap-4 mt-4">
                <button className="px-6 py-2 !bg-red-500 text-white font-semibold rounded-full flex items-center gap-2"
                type="button"
                onClick={handleAbandonarClick}
                    >                     
                    <TbDoorExit /> Abandonar
                </button>
            </div>
        </div>
    );
};

export default JobPostuladoCard;
