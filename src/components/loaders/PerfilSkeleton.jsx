// Las alturas imitan las líneas de texto reales para que al cargar la pantalla no salte
const Linea = ({ alto, barra, ancho }) => (
    <div className={`flex items-center ${alto}`}>
        <div className={`${barra} ${ancho} rounded bg-gray-200`} />
    </div>
);

const DatoSkeleton = () => (
    <div className="border-b border-gray-100 py-3 last:border-b-0">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="mt-1 h-6 w-40 rounded bg-gray-200" />
    </div>
);

const PerfilSkeleton = () => (
    <div className="mx-auto flex w-full max-w-3xl animate-pulse flex-col gap-5 px-4">
        <div className="flex items-center gap-5 rounded-3xl bg-white p-5">
            <div className="h-20 w-20 shrink-0 rounded-full bg-gray-200" />

            <div className="min-w-0">
                <Linea alto="h-8" barra="h-5" ancho="w-44" />
                <div className="md:hidden">
                    <Linea alto="h-8" barra="h-5" ancho="w-28" />
                </div>
                <Linea alto="h-5" barra="h-3.5" ancho="w-52" />
                <Linea alto="h-5" barra="h-3.5" ancho="w-36" />
            </div>
        </div>

        <div className="rounded-3xl bg-white p-5">
            <div className="flex h-10 items-center justify-between gap-3">
                <div className="h-6 w-44 rounded bg-gray-200" />
                <div className="h-10 w-20 rounded-xl bg-gray-200" />
            </div>

            <div className="mt-4 border-t border-gray-100 md:grid md:grid-cols-2 md:gap-x-10">
                {Array.from({ length: 5 }).map((_, i) => (
                    <DatoSkeleton key={i} />
                ))}
            </div>
        </div>
    </div>
);

export default PerfilSkeleton;
