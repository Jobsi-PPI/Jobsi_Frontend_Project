import { FiEdit, FiTrash2 } from "react-icons/fi";

const JobPublicadoCard = ({ job }) => {
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
                <button className="px-6 py-2 btn-amarillo text-black font-semibold rounded-full">
                    Editar
                </button>

                <button className="px-6 py-2 bg-[#0a0f1a] text-white font-semibold rounded-full flex items-center gap-2">
                    <FiTrash2 /> Eliminar
                </button>
            </div>
        </div>
    );
};

export default JobPublicadoCard;
