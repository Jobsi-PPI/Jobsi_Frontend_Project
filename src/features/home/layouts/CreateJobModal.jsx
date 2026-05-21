import { FiX } from "react-icons/fi";

import Button from "../../../components/ui/Button.jsx";
import Tooltip from "../../../components/ui/Tooltip.jsx";

const CreateJobModal = ({
    show,
    closing,
    opening,
    closeModal,
    handleCreateJob,
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    pago,
    setPago,
    ubicacion,
    setUbicacion,
    categoria,
    setCategoria,
    tipoPago,
    setTipoPago,
    errors
}) => {


    if (!show) return null;

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
            <div className={`bg-white w-[90%] max-w-[600px] rounded-2xl shadow-xl p-8 relative transition-all duration-300
                ${closing ? "scale-90 opacity-0": opening ? "scale-90 opacity-0": "scale-100 opacity-100"}`}>

                {/* Cerrar */}
                <button 
                    className="absolute top-4 right-4 btn-blanco text-black hover:text-red-500 text-2xl"
                    onClick={closeModal}
                >
                    <FiX className="w-9 h-9" />
                </button>

                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 text-center">
                    Publicar Job
                </h2>

                <form className="space-y-4" onSubmit={handleCreateJob}>
                    
                    {/* Título */}
                    <div>
                        <label className="block font-medium text-gray-700">Título del Job <span className="text-red-500">*</span><Tooltip text="Nombre corto y claro de lo que necesitas, ej: 'Ayuda con tarea de cálculo'" /></label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej. Arreglo de portátil"
                            className={`w-full p-3 border-2 rounded-lg text-black 
                                ${errors.titulo ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block font-medium text-gray-700">Descripción <span className="text-red-500">*</span><Tooltip text="Explica qué necesitas, cuándo y cualquier detalle relevante para el candidato" /></label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Describe tu necesidad..."
                            className={`w-full p-3 border-2 rounded-lg text-black h-32
                                ${errors.descripcion ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    {/* Pago */}
                    <div>
                        <label className="block font-medium text-gray-700">Pago ofrecido <span className="text-red-500">*</span><Tooltip text="Monto en pesos colombianos que ofreces por el trabajo" /></label>
                        <input
                            type="number"
                            value={pago}
                            onChange={(e) => setPago(e.target.value)}
                            placeholder="Ej. 20.000"
                            className={`w-full p-3 border-2 rounded-lg text-black
                                ${errors.pago ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    {/* Ubicación */}
                    <div>
                        <label className="block font-medium text-gray-700">Ubicación del Job <span className="text-red-500">*</span><Tooltip text="Lugar dentro del campus donde se realizará el trabajo" /></label>
                        <select
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                            className={`w-full p-3 border-2 rounded-lg text-black
                                ${errors.ubicacion ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Selecciona una ubicación</option>
                            <option value="Palmas">Palmas</option>
                            <option value="Almendros">Almendros</option>
                            <option value="Terraza">Terraza</option>
                            <option value="P40">P40</option>
                            <option value="p13">P13</option>
                        </select>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-base font-bold text-black">Categoría</label>
                        <select
                        value={categoria} onChange={(e) => setCategoria(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        >
                            <option value="ASESORIAS">ASESORIAS</option>
                            <option value="TAREAS">TAREAS</option>
                            <option value="MATERIALES">MATERIALES</option>
                            <option value="ENTRENAMIENTOS">ENTRENAMIENTOS</option>
                            <option value="OTRO">OTRO</option>
                        </select>
                    </div>

                    {/* Tipo de Pago */}
                    <div>
                        <label className="block text-base font-bold text-black">Tipo de pago</label>
                        <select
                            value={tipoPago}
                            onChange={(e) => setTipoPago(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        >
                            <option value="EFECTIVO">EFECTIVO</option>
                            <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                            <option value="INTERCAMBIO">INTERCAMBIO</option>
                            <option value="OTRO">OTRO</option>
                        </select>
                    </div>

                    <Button
                        variant="primary"
                        size="xl"
                        fullWidth
                        type="submit"
                        >
                        Publicar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateJobModal;
