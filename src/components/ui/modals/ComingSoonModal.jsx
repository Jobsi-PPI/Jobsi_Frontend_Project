import { GrUpdate } from "react-icons/gr";

import Button from "../../../components/ui/Button.jsx";

const ComingSoonModal = ({

    isOpen,
    onClose,
    closing,
    opening,

    title = "Implementaremos esta función próximamente",
    description = "Estamos trabajando en ello. Pronto estará disponible para ti.",
    icon = <GrUpdate size={50}  />,
    primaryAction,   

}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>

            {/* Contenedor del modal */}
            <div className={`w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-dashed border-zinc-300 transition-all duration-300
                ${closing ? "scale-90 opacity-0" : opening ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-2xl text-zinc-600">
                    {icon}
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
                    {title}
                </h2>

                <p className="mt-2 text-sm sm:text-base text-zinc-500 leading-relaxed">
                    {description}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    {primaryAction && (
                        <Button
                            variant={primaryAction.variant || "primary"}
                            size={primaryAction.size || "md"}
                            fullWidth
                            onClick={primaryAction.onClick}
                        >
                            {primaryAction.label}
                        </Button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ComingSoonModal
