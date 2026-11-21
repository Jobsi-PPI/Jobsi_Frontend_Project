import { FiClock } from "react-icons/fi";

import Button from "../../../../components/ui/Button.jsx";
import CodigoInput from "./CodigoInput.jsx";
import { enmascararCorreo, LONGITUD_CODIGO } from "../../hooks/useRecuperarContrasena.js";

const formatearTiempo = (segundos) => {
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const seg = String(segundos % 60).padStart(2, "0");
    return `${min}:${seg}`;
};

const PasoCodigo = ({ correo, codigo, onChange, error, enviando, segundosVigencia, segundosEspera, onSubmit, onReenviar }) => {
    const vencido = segundosVigencia === 0;

    return (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div>
                <h2 className="text-3xl font-bold text-black md:text-4xl">Revisa tu correo</h2>
                <p className="mt-2 break-words text-gray-600 md:text-lg">
                    Enviamos un código de {LONGITUD_CODIGO} dígitos a {enmascararCorreo(correo)}.
                </p>
            </div>

            <CodigoInput value={codigo} onChange={onChange} error={error} />

            <div className="flex items-center gap-2 rounded-xl bg-[#f4f6fb] px-4 py-3 text-sm font-medium text-gray-700" role="timer">
                <FiClock className="h-4 w-4 shrink-0" />
                {vencido
                    ? "El código venció. Solicita uno nuevo."
                    : `El código vence en ${formatearTiempo(segundosVigencia)} minutos`}
            </div>

            <Button type="submit" variant="warning" size="lg" fullWidth disabled={enviando || vencido} className="!rounded-xl">
                {enviando ? "Verificando..." : "Verificar código"}
            </Button>

            <p className="text-center text-gray-600">
                ¿No te llegó?{" "}
                <button type="button" onClick={onReenviar} disabled={enviando || segundosEspera > 0}
                    className="!border-0 !bg-transparent !p-0 font-semibold !text-[#1e3a8a] hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:no-underline">
                    {segundosEspera > 0 ? `Reenviar en ${segundosEspera} s` : "Reenviar código"}
                </button>
            </p>
        </form>
    );
};

export default PasoCodigo;
