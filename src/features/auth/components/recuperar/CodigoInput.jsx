import { useRef } from "react";

import { LONGITUD_CODIGO } from "../../hooks/useRecuperarContrasena.js";

const CodigoInput = ({ value, onChange, error }) => {
    const refs = useRef([]);
    const digitos = Array.from({ length: LONGITUD_CODIGO }, (_, i) => value[i] ?? "");

    const enfocar = (i) => refs.current[Math.max(0, Math.min(i, LONGITUD_CODIGO - 1))]?.focus();

    const handleChange = (i, e) => {
        const digito = e.target.value.replace(/\D/g, "").slice(-1);
        if (!digito) return;
        const copia = [...digitos];
        copia[i] = digito;
        onChange(copia.join(""));
        enfocar(i + 1);
    };

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const copia = [...digitos];
            if (copia[i]) {
                copia[i] = "";
            } else if (i > 0) {
                copia[i - 1] = "";
                enfocar(i - 1);
            }
            onChange(copia.join(""));
        } else if (e.key === "ArrowLeft") {
            enfocar(i - 1);
        } else if (e.key === "ArrowRight") {
            enfocar(i + 1);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pegado = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LONGITUD_CODIGO);
        if (!pegado) return;
        onChange(pegado);
        enfocar(pegado.length);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
                {digitos.map((digito, i) => (
                    <input
                        key={i}
                        ref={(el) => { refs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                        autoFocus={i === 0}
                        aria-label={`Dígito ${i + 1} de ${LONGITUD_CODIGO}`}
                        aria-invalid={!!error}
                        value={digito}
                        onChange={(e) => handleChange(i, e)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onFocus={(e) => e.target.select()}
                        className={`aspect-square w-full rounded-xl border bg-white text-center text-xl font-bold text-black outline-none transition focus-visible:ring-2 focus-visible:ring-[#1e3a8a]/30
                            ${error ? "border-red-500" : "border-gray-300"}`}
                    />
                ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default CodigoInput;
