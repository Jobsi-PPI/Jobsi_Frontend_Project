import { MdError } from "react-icons/md";
import { FiSearch, FiLock, FiAlertTriangle, FiWifiOff } from "react-icons/fi";

import mascota from "../../../assets/jobsi-mascota-jobito_render.png";
import Button from "../Button.jsx";

const ERROR_MAP = {
    404: {
        icon: <FiSearch size={50} className="text-yellow-400" />,
        number: "404",
        title: "Recurso no encontrado",
        description: "Lo que buscas no existe o fue eliminado.",
    },
    403: {
        icon: <FiLock size={50} className="text-red-400" />,
        number: "403",
        title: "Acceso denegado",
        description: "No tienes permisos para realizar esta acción.",
    },
    500: {
        icon: <FiAlertTriangle size={50} className="text-red-500" />,
        number: "500",
        title: "Error del servidor",
        description: "Algo falló en el servidor. Por favor intentalo más tarde.",
    },
    503: {
        icon: <FiWifiOff size={50} className="text-gray-400" />,
        number: "503",
        title: "Servicio no disponible",
        description: "El servidor está temporalmente fuera de línea.",
    },
};

const DEFAULT_ERROR = {
    icon: <MdError size={50} className="text-red-400" />,
    title: "Algo salió mal",
    description: "Ocurrió un error inesperado. Intenta de nuevo.",
    icon: <FiAlertTriangle size={50} className="text-yellow-400" />,
};

const ErrorBackendModal = ({

    isOpen,
    onClose,
    closing,
    opening,
    errorCode,
    imageSrc = mascota,
    primaryAction,

}) => {

    if (!isOpen) return null;

    const error = ERROR_MAP[errorCode] || DEFAULT_ERROR;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>

            {/* Contenedor del modal */}
            <div className={`w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-dashed border-zinc-300 transition-all duration-300
                ${closing ? "scale-90 opacity-0" : opening ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-2xl text-zinc-600">
                    {error.icon}
                </div>

                <h1 className="text-base sm:text-lg font-semibold text-zinc-900">
                    {error.number}
                </h1>

                <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                    {error.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-zinc-500 leading-relaxed">
                    {error.description}
                </p>

                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Mascota Jobsi"
                        className="mx-auto mt-1 w-[200px] h-[180px] object-contain"
                    />
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    {primaryAction && (
                        <Button
                            variant={primaryAction.variant || "primary"}
                            size={primaryAction.size || "md"}
                            fullWidth
                            onClick={primaryAction.onClick}
                        >
                            {primaryAction.label || "Entendido"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorBackendModal;
