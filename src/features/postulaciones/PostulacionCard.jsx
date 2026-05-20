import { FiUser, FiMail, FiClock } from "react-icons/fi";
import Button from "../../components/ui/Button.jsx";
import EstrellasCalificacion from "../../components/ui/EstrellasCalificacion.jsx";
import { tiempoRelativo } from "../../utils/timeUtils.js";

const PostulacionCard = ({ postulacion, onElegir }) => {
    const { solicitudId, nombreUsuario, correoUsuario, fechaSolicitud } = postulacion;

    return (
        <div className="bg-white rounded-xl border-2 border-black p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white flex-shrink-0">
                    <FiUser size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-[#1e3a8a]">{nombreUsuario}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FiMail size={12} /> {correoUsuario}
                    </p>
                    <EstrellasCalificacion calificacion={postulacion.valoracionPromedio ?? null} />
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <FiClock size={11} /> {tiempoRelativo(fechaSolicitud)}
                    </p>
                </div>
            </div>

            <Button variant="primary" size="sm" onClick={() => onElegir(solicitudId)}>
                Seleccionar
            </Button>
        </div>
    );
};

export default PostulacionCard;
