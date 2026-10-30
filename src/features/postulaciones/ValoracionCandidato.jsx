import { tieneValoracion } from "../../utils/ordenPostulaciones.js";
import { estrellasLlenas } from "../../utils/formatUtils.js";

const ValoracionCandidato = ({ candidato }) => {
    const tiene = tieneValoracion(candidato);
    const valor = Number(candidato.valoracionPromedio);
    const llenas = tiene ? estrellasLlenas(valor) : 0;

    return (
        <div
            role="img"
            aria-label={tiene ? `Calificación promedio ${valor.toFixed(1)} de 5` : "Aún sin calificaciones"}
            className="flex items-center gap-2"
        >
            <span className="text-3xl font-bold text-gray-900">
                {tiene ? valor.toFixed(1) : "–"}
            </span>

            <div className="flex flex-col leading-tight">
                <span className="flex text-sm">
                    {[1, 2, 3, 4, 5].map((estrella) => (
                        <span key={estrella} className={estrella <= llenas ? "text-yellow-400" : "text-gray-200"}>
                            ★
                        </span>
                    ))}
                </span>

                <span className="text-xs text-gray-500">
                    {tiene ? "Calificación promedio" : "Aún sin calificaciones"}
                </span>
            </div>
        </div>
    );
};

export default ValoracionCandidato;
