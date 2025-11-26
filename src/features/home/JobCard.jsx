import { FiUser, FiClock } from "react-icons/fi";

const JobCard = ({ job }) => {
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
                <p className="font-bold text-[#1e3a8a]">Efectivo</p>
                <p className="font-bold text-black">${job.pago}</p>

                <p className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                    <FiClock /> Hace poco
                </p>
            </div>

            {/* Botón */}
            <button className="mt-4 w-full bg-[#1e3a8a] text-white py-2 rounded-lg font-semibold hover:bg-[#142a61] transition">
                Tomar Job
            </button>
        </div>
    );
};

export default JobCard;
