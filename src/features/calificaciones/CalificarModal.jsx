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
            <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col gap-5 transition-all duration-300
                ${closing ? "scale-90 opacity-0" : opening ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
            >
                {/* Cerrar */}
                <button
                    onClick={onCerrar}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                >
                    <FiX size={24} />
                </button>

                {/* Título */}
                <div>
                    <h2 className="text-2xl font-bold text-[#1e3a8a]">Finalizar y calificar</h2>
                    <p className="text-sm text-gray-500 mt-1">{jobActual?.titulo}</p>
                </div>

                {/* Categorías */}
                <div className="flex flex-col gap-4">
                    {categorias.map((categoria) => (
                        <div key={categoria}>
                            <p className="font-semibold text-gray-700 mb-1 text-sm">{categoria}</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setPuntuacionCategoria(categoria, star)}
                                        onMouseEnter={() => setHoverCategoria(categoria, star)}
                                        onMouseLeave={() => setHoverCategoria(categoria, 0)}
                                        className="text-3xl transition-transform hover:scale-110 focus:outline-none"
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
                        rows={3}
                        maxLength={300}
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#1e3a8a] transition"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">{comentario.length}/300</p>
                </div>

                {/* Botones */}
                <div className="flex gap-3 justify-end">
                    <Button variant="secondary" size="md" onClick={onCerrar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" size="md" onClick={onSubmit}>
                        Finalizar Job
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CalificarModal;
