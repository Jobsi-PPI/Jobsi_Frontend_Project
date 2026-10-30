// Las alturas imitan las líneas de texto reales para que al cargar la pantalla no salte
const Linea = ({ alto, barra, ancho }) => (
    <div className={`flex items-center ${alto}`}>
        <div className={`${barra} ${ancho} rounded bg-gray-200`} />
    </div>
);

const TarjetaSkeleton = ({ className = "" }) => (
    <div className={`flex w-[80%] max-w-[360px] shrink-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 md:w-auto md:max-w-none ${className}`}>
        <div className="flex items-start justify-between">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div className="h-6 w-28 rounded-full bg-gray-200" />
        </div>

        <div>
            <Linea alto="h-7" barra="h-5" ancho="w-1/2" />
            <Linea alto="h-5" barra="h-3.5" ancho="w-3/4" />
        </div>

        <div className="flex items-center gap-2">
            <div className="h-9 w-14 rounded bg-gray-200" />
            <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-24 rounded bg-gray-200" />
                <div className="h-3 w-28 rounded bg-gray-200" />
            </div>
        </div>

        <Linea alto="h-5" barra="h-3.5" ancho="w-1/3" />
        <div className="h-[45px] w-full rounded-xl bg-gray-200" />
    </div>
);

const PostulacionSkeleton = () => (
    <div className="flex animate-pulse flex-col gap-3">
        <div className="flex flex-col gap-2">
            <Linea alto="h-7" barra="h-5" ancho="w-2/3" />

            <div className="flex gap-2">
                <div className="h-8 w-24 rounded-full bg-gray-200" />
                <div className="h-8 w-36 rounded-full bg-gray-200" />
            </div>
        </div>

        <div className="-mx-4 flex gap-3 overflow-hidden px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
            <TarjetaSkeleton />
            <TarjetaSkeleton />
            <TarjetaSkeleton className="max-lg:hidden" />
        </div>
    </div>
);

export default PostulacionSkeleton;
