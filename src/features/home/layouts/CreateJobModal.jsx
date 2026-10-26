import { FiX } from "react-icons/fi";
import { Drawer } from "vaul";

import Button from "../../../components/ui/Button.jsx";
import Tooltip from "../../../components/ui/Tooltip.jsx";
import { useIsMobile } from "../../../components/ui/modals/hooks/useIsMobile.js";

const CATEGORIAS = [
    { value: "ASESORIAS", label: "Asesorías" },
    { value: "TAREAS", label: "Tareas" },
    { value: "MATERIALES", label: "Materiales" },
    { value: "ENTRENAMIENTOS", label: "Entrenamientos" },
    { value: "OTRO", label: "Otro" },
];

const TIPOS_PAGO = [
    { value: "EFECTIVO", label: "Efectivo" },
    { value: "TRANSFERENCIA", label: "Transferencia" },
    { value: "INTERCAMBIO", label: "Intercambio" },
    { value: "OTRO", label: "Otro" },
];

const inputBase =
    "mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/15";

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

    const isMobile = useIsMobile();

    // Vaul exige Title/Description (Radix); en escritorio son un h2 y un p normales
    const Titulo = isMobile ? Drawer.Title : "h2";
    const Descripcion = isMobile ? Drawer.Description : "p";

    const contenido = (
        <>
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 pb-4 pt-2 sm:px-7 md:pt-6">
                <div>
                    <Titulo className="text-xl font-bold text-[#1e3a8a] sm:text-2xl">
                        Publicar Job
                    </Titulo>
                    <Descripcion className="mt-1 text-sm text-gray-500">
                        Cuéntale a la comunidad qué necesitas.
                    </Descripcion>
                </div>

                <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Cerrar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center !rounded-lg !border-0 !bg-[#f1f3f7] !p-0 text-gray-500 transition hover:!bg-gray-200 hover:!text-gray-700"
                >
                    <FiX className="h-5 w-5" />
                </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleCreateJob}>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 sm:px-7">

                    {/* Título */}
                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-800">Título del Job <span className="ml-0.5 text-red-500">*</span><Tooltip text="Nombre corto y claro de lo que necesitas, ej: 'Ayuda con tarea de cálculo'" /></label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej. Asesoría de cálculo integral"
                            className={`${inputBase} ${errors.titulo ? "border-red-500" : "border-gray-200"}`}
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="flex items-center text-sm font-semibold text-gray-800">Descripción <span className="ml-0.5 text-red-500">*</span><Tooltip text="Explica qué necesitas, cuándo y cualquier detalle relevante para el candidato" /></label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Describe tu necesidad..."
                            className={`${inputBase} h-28 resize-none ${errors.descripcion ? "border-red-500" : "border-gray-200"}`}
                        />
                    </div>

                    {/* Pago y ubicación */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Pago */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-800">Pago ofrecido <span className="ml-0.5 text-red-500">*</span><Tooltip text="Monto en pesos colombianos que ofreces por el trabajo" /></label>
                            <input
                                type="number"
                                value={pago}
                                onChange={(e) => setPago(e.target.value)}
                                placeholder="$ 20.000"
                                className={`${inputBase} ${errors.pago ? "border-red-500" : "border-gray-200"}`}
                            />
                        </div>

                        {/* Ubicación */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-800">Ubicación del Job <span className="ml-0.5 text-red-500">*</span><Tooltip text="Lugar dentro del campus donde se realizará el trabajo" /></label>
                            <select
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                                className={`${inputBase} ${errors.ubicacion ? "border-red-500" : "border-gray-200"}`}
                            >
                                <option value="">Selecciona una ubicación</option>
                                <option value="Palmas">Palmas</option>
                                <option value="Almendros">Almendros</option>
                                <option value="Terraza">Terraza</option>
                                <option value="P40">P40</option>
                                <option value="p13">P13</option>
                            </select>
                        </div>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Categoría</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {CATEGORIAS.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setCategoria(cat.value)}
                                    className={`!rounded-full !border !px-3 !py-2 text-xs font-semibold transition
                                        ${categoria === cat.value
                                            ? "!border-[#1e3a8a] !bg-[#1e3a8a] !text-white"
                                            : "!border-gray-200 !bg-white !text-gray-600 hover:!bg-gray-50"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tipo de Pago */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Tipo de pago</label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {TIPOS_PAGO.map((tipo) => (
                                <button
                                    key={tipo.value}
                                    type="button"
                                    onClick={() => setTipoPago(tipo.value)}
                                    className={`!rounded-lg !border !px-3 !py-2.5 text-xs font-semibold transition
                                        ${tipoPago === tipo.value
                                            ? "!border-[#1e3a8a] !bg-[#eef2fb] !text-[#1e3a8a]"
                                            : "!border-gray-200 !bg-white !text-gray-600 hover:!bg-gray-50"
                                        }`}
                                >
                                    {tipo.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-7">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="!rounded-lg !border !border-gray-200 !bg-white !px-5 !py-2.5 text-sm font-semibold !text-gray-700 transition hover:!bg-gray-50 max-md:hidden"
                    >
                        Cancelar
                    </button>

                    <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        className="!rounded-lg !px-6 !py-2.5 max-md:w-full"
                    >
                        Publicar
                    </Button>
                </div>
            </form>
        </>
    );

    if (isMobile) {
        return (
            <Drawer.Root
                open={show && !closing}
                onOpenChange={(abierto) => {
                    if (!abierto) closeModal();
                }}
            >
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-[998] bg-black/50" />
                    <Drawer.Content className="fixed inset-x-0 bottom-0 z-[999] flex max-h-[92dvh] flex-col rounded-t-3xl bg-white outline-none">
                        <div className="mx-auto mb-3 mt-3 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />
                        {contenido}
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

    if (!show) return null;

    return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
            <div className={`flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300
                ${closing ? "scale-90 opacity-0": opening ? "scale-90 opacity-0": "scale-100 opacity-100"}`}>
                {contenido}
            </div>
        </div>
    );
};

export default CreateJobModal;
