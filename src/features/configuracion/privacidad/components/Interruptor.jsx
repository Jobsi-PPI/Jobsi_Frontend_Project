// Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades
const Interruptor = ({ activo, onChange, label }) => (
    <button
        type="button"
        role="switch"
        aria-checked={activo}
        aria-label={label}
        onClick={onChange}
        className={`relative h-8 w-14 shrink-0 !rounded-full !border-0 !p-0 transition-colors focus-visible:ring-2 focus-visible:ring-[#1e3a8a]/40 focus-visible:ring-offset-2
            ${activo ? "!bg-[#1e3a8a]" : "!bg-slate-300"}`}
    >
        <span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${activo ? "translate-x-6" : "translate-x-0"}`} />
    </button>
);

export default Interruptor;
