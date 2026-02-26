import React from 'react'
import Button from "../Button.jsx";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

const EmptyState = ({

    title = "No hay nada por aquí",
    description = "Prueba otra búsqueda o crea tu primer elemento.",
    icon = <IoExtensionPuzzleSharp />,
    primaryAction,   
    secondaryAction,

}) => {
    return (
        <div className="w-full rounded-2xl border border-dashed border-zinc-300 bg-white p-6 sm:p-8 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xl">
                {icon}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                {title}
            </h3>

            <p className="mt-1 text-sm sm:text-base text-zinc-600">
                {description}
            </p>

            {(primaryAction || secondaryAction) && (
                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
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

                {secondaryAction && (
                    <Button
                    variant={secondaryAction.variant || "secondary"}
                    size={secondaryAction.size || "md"}
                    fullWidth
                    onClick={secondaryAction.onClick}
                    >
                    {secondaryAction.label}
                    </Button>
                )}
                </div>
            )}
        </div>
)
}

export default EmptyState
