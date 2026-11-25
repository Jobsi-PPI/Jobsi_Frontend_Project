import { FiAlertTriangle } from "react-icons/fi";

import Button from "../../../../components/ui/Button.jsx";
import { useEliminarCuenta } from "../hooks/useEliminarCuenta.js";

const EliminarCuentaModal = ({ isOpen, onClose, closing, opening }) => {
    const { contrasena, error, enviando, cambiarContrasena, cerrar, confirmar } = useEliminarCuenta(onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm" onClick={cerrar}>
            <form
                onSubmit={confirmar}
                noValidate
                role="dialog"
                aria-modal="true"
                aria-labelledby="eliminar-cuenta-titulo"
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 sm:p-8
                    ${closing || opening ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
                    <FiAlertTriangle />
                </div>

                <h2 id="eliminar-cuenta-titulo" className="text-center text-lg font-semibold text-gray-900">
                    ¿Eliminar tu cuenta?
                </h2>
                <p className="mt-2 text-center text-sm leading-relaxed text-gray-500 sm:text-base">
                    Se borrarán tus Jobs, postulaciones y calificaciones. Esta acción no se puede deshacer.
                </p>

                <div className="mt-5 flex flex-col gap-1.5">
                    <label htmlFor="eliminar-contrasena" className="text-sm font-bold text-gray-900">
                        Confirma con tu contraseña
                    </label>
                    <input
                        id="eliminar-contrasena"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        placeholder="Tu contraseña actual"
                        value={contrasena}
                        onChange={(e) => cambiarContrasena(e.target.value)}
                        aria-invalid={!!error}
                        className={`h-13 w-full rounded-xl border bg-white px-4 text-base text-gray-900 outline-none transition focus-visible:ring-2 focus-visible:ring-red-300
                            ${error ? "border-red-500" : "border-gray-300"}`}
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button type="button" variant="secondary" size="lg" onClick={cerrar} disabled={enviando} className="!rounded-xl">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="danger" size="lg" disabled={enviando} className="!rounded-xl">
                        {enviando ? "Eliminando..." : "Eliminar mi cuenta"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EliminarCuentaModal;
