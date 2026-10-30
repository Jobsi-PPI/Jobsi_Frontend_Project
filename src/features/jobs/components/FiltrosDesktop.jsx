import { OPCIONES_FILTRO, etiquetaEstado } from "../../../utils/estadosJob.js";

// Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades
const FiltrosDesktop = ({ tabs, activeTab, setActiveTab, vacio, valor, onChange }) => {
    return (
        <div className="hidden md:block">
            <div role="tablist" className="flex gap-2 border-b border-gray-200 px-2">
                {tabs.map(({ id, label, cantidad, cargando }) => {
                    const activo = activeTab === id;

                    return (
                        <button key={id}
                            type="button"
                            role="tab"
                            aria-selected={activo}
                            onClick={() => setActiveTab(id)}
                            className={`-mb-px flex items-center gap-2 !rounded-none !border-x-0 !border-t-0 !border-b-2 !bg-transparent !px-4 !py-3 text-base font-bold transition
                                ${activo ? "!border-[#ffb906] !text-[#1e3a8a]" : "!border-transparent !text-gray-500 hover:!text-[#1e3a8a]"}`}
                        >
                            {label}

                            {cargando ? (
                                <span className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
                            ) : (
                                <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold
                                    ${activo ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-500"}`}>
                                    {cantidad > 99 ? "99+" : cantidad}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {!vacio && (
                <div role="group" aria-label="Filtrar por estado" className="mt-4 flex flex-wrap gap-2">
                    {OPCIONES_FILTRO[activeTab].map((estado) => {
                        const activo = valor === estado;

                        return (
                            <button key={estado}
                                type="button"
                                aria-pressed={activo}
                                onClick={() => onChange(estado)}
                                className={`flex h-9 min-w-[100px] items-center justify-center !rounded-full !border !px-4 text-sm font-semibold transition
                                    ${activo
                                        ? "!border-[#1e3a8a] !bg-[#1e3a8a] !text-white"
                                        : "!border-gray-300 !bg-white !text-gray-700 hover:!bg-gray-50"}`}
                            >
                                {etiquetaEstado(estado)}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FiltrosDesktop;
