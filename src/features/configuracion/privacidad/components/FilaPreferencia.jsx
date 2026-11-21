import Interruptor from "./Interruptor.jsx";

const FilaPreferencia = ({ titulo, descripcion, activo, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-t border-gray-100 py-4 first:border-t-0 first:pt-0 last:pb-0">
        <div className="min-w-0">
            <p className="text-base font-bold text-gray-900">{titulo}</p>
            <p className="text-sm text-gray-500">{descripcion}</p>
        </div>
        <Interruptor activo={activo} onChange={onChange} label={titulo} />
    </div>
);

export default FilaPreferencia;
