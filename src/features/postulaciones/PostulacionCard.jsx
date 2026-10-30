import { FiUser } from "react-icons/fi";
import Button from "../../components/ui/Button.jsx";
import ValoracionCandidato from "./ValoracionCandidato.jsx";
import { fraseSePostulo } from "../../utils/timeUtils.js";

const PostulacionCard = ({ postulacion, esMejor, onElegir }) => {
    const { solicitudId, nombreUsuario, correoUsuario, fechaSolicitud } = postulacion;

    return (
        <article className="flex w-[80%] max-w-[360px] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:w-auto md:max-w-none">

            <div className="flex items-start justify-between gap-2">
                {/* Placeholder de la foto de perfil */}
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e6ecfb] text-[#1e3a8a]">
                    <FiUser className="h-6 w-6" />
                </span>

                {esMejor && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                        Mejor valorado
                    </span>
                )}
            </div>

            <div className="min-w-0">
                <h4 className="truncate text-lg font-bold text-gray-900">{nombreUsuario}</h4>
                <p className="truncate text-sm text-gray-500">{correoUsuario}</p>
            </div>

            <ValoracionCandidato candidato={postulacion} />

            <p className="text-sm text-gray-500">{fraseSePostulo(fechaSolicitud)}</p>

            <Button
                variant="primary"
                size="lg"
                fullWidth
                className="!rounded-xl !font-bold"
                onClick={() => onElegir(solicitudId)}
            >
                Elegir candidato
            </Button>
        </article>
    );
};

export default PostulacionCard;
