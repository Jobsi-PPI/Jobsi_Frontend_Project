import { FiX } from "react-icons/fi";
import Button from "../../components/ui/Button.jsx";

const CalificarModal = ({
    isOpen, closing, opening,
    jobActual, categorias,
    puntuaciones, setPuntuacionCategoria,
    hover, setHoverCategoria,
    comentario, setComentario,
    onCerrar, onSubmit,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCerrar} />

            {/* Modal */}
            <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 transition-all duration-300
                ${closing ? "scale-90 opacity-0" : opening ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
            >
                {/* Cerrar */}
                {/* Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades */}
                <button
                    type="button"
                    onClick={onCerrar}
                    aria-label="Cerrar"
                    className="absolute top-3 right-3 !border-0 !bg-transparent !p-1.5 !text-gray-400 transition hover:!text-red-500"
                >
                    <FiX size={24} />
                </button>

                {/* Título */}
                <div>
                    <h2 className="text-2xl font-bold text-[#1e3a8a]">Finalizar y calificar</h2>
                    <p className="text-sm text-gray-500 mt-1">{jobActual?.titulo}</p>
                </div>

                {/* Categorías */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {categorias.map((categoria) => (
                        <div key={categoria}>
                            <p className="font-semibold text-gray-700 mb-1 text-sm">{categoria}</p>
                            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setPuntuacionCategoria(categoria, star)}
                                        onMouseEnter={() => setHoverCategoria(categoria, star)}
                                        onMouseLeave={() => setHoverCategoria(categoria, 0)}
                                        aria-label={`${star} de 5 en ${categoria}`}
                                        className="flex h-10 items-center justify-center !rounded-xl !border-0 !bg-gray-50 !p-0 text-2xl transition hover:!bg-gray-100 focus-visible:ring-2 focus-visible:ring-[#1e3a8a]/40 sm:h-11 sm:text-3xl"
                                    >
                                        <span className={star <= (hover[categoria] || puntuaciones[categoria]) ? "text-yellow-400" : "text-gray-300"}>
                                            ★
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comentario */}
                <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                        Comentario <span className="text-gray-400 font-normal">(opcional)</span>
                    </label>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Cuéntanos cómo fue tu experiencia..."
                        rows={2}
                        maxLength={300}
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#1e3a8a] transition"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">{comentario.length}/300</p>
                </div>

                {/* Botones */}
                <div className="flex gap-3 justify-end">
                    <Button variant="secondary" size="md" className="max-sm:flex-1" onClick={onCerrar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" size="md" className="max-sm:flex-1" onClick={onSubmit}>
                        Finalizar Job
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CalificarModal;
