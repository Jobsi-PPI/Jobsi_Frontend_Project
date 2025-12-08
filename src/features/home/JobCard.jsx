import { FiUser, FiClock } from "react-icons/fi";
import Swal from "sweetalert2";
import { tomarJob } from "/src/services/jobsServices/jobPublicService";


const JobCard = ({ job, onTomar }) => {

    const handleTomarJob = async () => {

        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail"); 

        if (job.solicitanteCorreo === userEmail) {
            Swal.fire({
                icon: "info",
                title: "No puedes tomar tu propio Job",
                text: "Debes esperar a que otro usuario se postule.",
            });
            return;
        }

        console.log("solicitanteCorreo:", job.solicitanteCorreo);
        console.log("userEmail localStorage:", userEmail);

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
            if (error?.response?.data?.message?.includes("ya fue tomado")) {
                Swal.fire({
                    icon: "info",
                    title: "Este Job ya fue tomado",
                    text: "Otro usuario ya se postuló antes que tú.",
                });
                return;
            }

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
                <p className="font-bold text-[#1e3a8a]">Efectivo</p>
                <p className="font-bold text-black">${job.pago}</p>

                <p className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                    
                    <FiClock /> Hace poco
                </p>
            </div>

            <div className="mt-4">
                <p className="font-bold text-[#1e3a8a]">Estado</p>
                <p className="font-bold text-black">{job.estado}</p>
            </div>

            {console.log("Estado:", job.estado)}
            
            {/* Botón de tomar Job */}
            <button className="mt-4 w-full bg-[#1e3a8a] text-white py-2 rounded-lg font-semibold hover:bg-[#142a61] transition"
            type="button"
            onClick={handleTomarJob}>
                Tomar Job
            </button>
        </div>
    );
};

export default JobCard;
