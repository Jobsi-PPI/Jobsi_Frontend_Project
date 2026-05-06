import { FiUser } from "react-icons/fi";
import Button from "../../components/ui/Button.jsx";
import EstrellasCalificacion from "../../components/ui/EstrellasCalificacion.jsx";

const PostulacionCard = ({ postulacion, onElegir }) => {
    const { id, candidatoNombre, candidatoCorreo, candidatoCalificacion } = postulacion;

    return (
        <div className="bg-white rounded-xl border-2 border-black p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white flex-shrink-0">
                    <FiUser size={20} />
                </div>
                <div>
                    <p className="font-bold text-[#1e3a8a]">{candidatoNombre}</p>
                    <p className="text-sm text-gray-600">{candidatoCorreo}</p>
                    <EstrellasCalificacion calificacion={candidatoCalificacion} />
                </div>
            </div>

            <Button variant="primary" size="sm" onClick={() => onElegir(id)}>
                Seleccionar
            </Button>
        </div>
    );
};

export default PostulacionCard;
