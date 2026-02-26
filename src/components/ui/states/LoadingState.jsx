import React from 'react'

const LoadingState = ({
    title = "Cargando…",
    description = "Estamos preparando todo para ti.",

}) => {
return (
        <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 text-center shadow-sm">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full border-4 border-zinc-200 border-t-zinc-600 animate-spin" />
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                {title}
            </h3>
            <p className="mt-1 text-sm sm:text-base text-zinc-600">
                {description}
            </p>
        </div>
    );
}

export default LoadingState
