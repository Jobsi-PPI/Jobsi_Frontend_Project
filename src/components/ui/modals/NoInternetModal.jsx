import { FiWifiOff, FiRefreshCw } from "react-icons/fi";

import mascota from "../../../assets/jobsi-mascota-jobito_render.png";
import Button from "../Button.jsx";

const NoInternetModal = ({

    isOpen,
    onClose,
    closing,
    opening,
    onRetry,
    imageSrc = mascota,

}) => {

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            {/* Contenedor del modal */}
            <div
                className={`w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-dashed border-zinc-300 transition-all duration-300
                    ${closing ? "scale-90 opacity-0" : opening ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-2xl text-zinc-600">
                    <FiWifiOff size={50} className="text-gray-400" />
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                    Sin conexión a internet
                </h3>

                <p className="mt-2 text-sm sm:text-base text-zinc-500 leading-relaxed">
                    Verifica tu conexión e intenta de nuevo.
                </p>

                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Mascota Jobsi"
                        className="mx-auto mt-1 w-[200px] h-[180px] object-contain"
                    />
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

                    {onRetry && (
                        <Button
                            variant="primary"
                            size="md"
                            fullWidth
                            onClick={() => {
                                if (navigator.onLine) {
                                    onRetry();
                                    onClose();
                                }
                            }}
                        >
                            <FiRefreshCw className="mr-2" /> Reintentar
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        size="md"
                        fullWidth
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default NoInternetModal;