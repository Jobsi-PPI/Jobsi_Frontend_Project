import { Drawer } from "vaul";

const FiltroEstadoSheet = ({ open, onOpenChange, opciones, valor, onChange, onLimpiar }) => (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[998] bg-black/40" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-[999] mx-auto flex w-full max-w-md flex-col rounded-t-3xl bg-white px-6 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] outline-none">

                <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

                <div className="flex items-center justify-between gap-3">
                    <Drawer.Title className="text-lg font-bold text-gray-900">
                        Filtrar por estado
                    </Drawer.Title>

                    <button
                        type="button"
                        onClick={onLimpiar}
                        className="!rounded-none !border-0 !bg-transparent !p-0 text-sm !font-bold !text-[#1e3a8a]"
                    >
                        Limpiar
                    </button>
                </div>

                <Drawer.Description className="sr-only">
                    Elige el estado de los jobs que quieres ver
                </Drawer.Description>

                <div role="radiogroup" aria-label="Estado" className="mt-2">
                    {opciones.map(({ value, label }) => (
                        <label
                            key={value}
                            className="flex cursor-pointer items-center justify-between border-b border-gray-100 py-4 text-base text-gray-900 last:border-b-0"
                        >
                            {label}

                            <input
                                type="radio"
                                name="filtro-estado"
                                value={value}
                                checked={valor === value}
                                onChange={() => onChange(value)}
                                className="peer sr-only"
                            />
                            <span className="h-6 w-6 rounded-full border-2 border-gray-300 transition peer-checked:border-[#1e3a8a] peer-checked:bg-[#1e3a8a] peer-checked:shadow-[inset_0_0_0_3px_white] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1e3a8a]/40" />
                        </label>
                    ))}
                </div>

            </Drawer.Content>
        </Drawer.Portal>
    </Drawer.Root>
);

export default FiltroEstadoSheet;
