import React from 'react'
import Button from "../Button.jsx";
import { AiFillWarning } from "react-icons/ai";


const ErrorState = ({
    
    title = "Algo salió mal",
    description = "Intenta de nuevo. Si el problema persiste, vuelve más tarde.",
    icon = <AiFillWarning size={40} className="text-yellow-500" />,
    onRetry,
    onSecondary, // { label, onClick }

    }) => {

    return (
            <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                    {icon}
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-red-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm sm:text-base text-red-800">
                    {description}
                </p>

                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                    {onRetry && (
                    <Button variant="danger" fullWidth onClick={onRetry}>
                        Reintentar
                    </Button>
                    )}

                    {onSecondary?.onClick && (
                    <Button variant="secondary" fullWidth onClick={onSecondary.onClick}>
                        {onSecondary.label || "Volver"}
                    </Button>
                    )}
                </div>
            </div>
        );
}

export default ErrorState
