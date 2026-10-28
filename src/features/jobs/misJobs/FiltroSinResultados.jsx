const FiltroSinResultados = ({ etiqueta, onQuitar }) => (
    <div className="flex flex-col items-center gap-2 py-10 text-center">
        <p className="text-base font-semibold text-gray-700">
            No hay jobs con estado {etiqueta}
        </p>

        <button
            type="button"
            onClick={onQuitar}
            className="!rounded-none !border-0 !bg-transparent !p-0 text-sm !font-bold !text-[#1e3a8a] underline"
        >
            Quitar filtro
        </button>
    </div>
);

export default FiltroSinResultados;
