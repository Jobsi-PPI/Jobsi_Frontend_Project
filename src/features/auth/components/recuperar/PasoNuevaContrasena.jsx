import { useState } from "react";

import Button from "../../../../components/ui/Button.jsx";
import { MIN_CONTRASENA } from "../../hooks/useRecuperarContrasena.js";

const NIVELES = [
    { texto: `Usa al menos ${MIN_CONTRASENA} caracteres`, barra: "bg-slate-200", color: "text-slate-500" },
    { texto: "Débil", barra: "bg-red-500", color: "text-red-600" },
    { texto: "Media", barra: "bg-[#ffb906]", color: "text-amber-600" },
    { texto: "Fuerte", barra: "bg-green-500", color: "text-green-600" },
];

const calcularNivel = (contrasena) => {
    if (contrasena.length < MIN_CONTRASENA) return 0;
    const variedad = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(contrasena)).length;
    if (variedad >= 3 && contrasena.length >= 12) return 3;
    if (variedad >= 3 || contrasena.length >= 12) return 2;
    return 1;
};

const claseInput = (error) =>
    `h-13 w-full rounded-xl border bg-white px-4 text-base text-black outline-none transition focus-visible:ring-2 focus-visible:ring-[#1e3a8a]/30
    ${error ? "border-red-500" : "border-gray-300"}`;

const PasoNuevaContrasena = ({ nueva, confirmar, onChangeNueva, onChangeConfirmar, errores, enviando, onSubmit }) => {
    const [ver, setVer] = useState(false);
    const nivel = calcularNivel(nueva);
    const { texto, barra, color } = NIVELES[nivel];

    return (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div>
                <h2 className="text-3xl font-bold text-black md:text-4xl">Crea una nueva contraseña</h2>
                <p className="mt-2 text-gray-600 md:text-lg">
                    Debe tener al menos {MIN_CONTRASENA} caracteres. No uses la anterior.
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="recuperar-nueva" className="text-sm font-bold text-black">Nueva contraseña</label>
                <div className="relative">
                    <input
                        id="recuperar-nueva"
                        type={ver ? "text" : "password"}
                        autoComplete="new-password"
                        autoFocus
                        placeholder={`Mínimo ${MIN_CONTRASENA} caracteres`}
                        value={nueva}
                        onChange={(e) => onChangeNueva(e.target.value)}
                        aria-invalid={!!errores.nueva}
                        className={`${claseInput(errores.nueva)} pr-20`}
                    />
                    <button type="button" onClick={() => setVer((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 !border-0 !bg-transparent !p-1 text-sm font-semibold !text-gray-700">
                        {ver ? "Ocultar" : "Ver"}
                    </button>
                </div>

                <div className="mt-1 flex gap-2" aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                        <span key={n} className={`h-1 flex-1 rounded-full transition-colors ${n <= nivel ? barra : "bg-slate-200"}`}></span>
                    ))}
                </div>
                <p className={`text-xs font-semibold ${color}`}>{texto}</p>
                {errores.nueva && <p className="text-sm text-red-600">{errores.nueva}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="recuperar-confirmar" className="text-sm font-bold text-black">Confirmar contraseña</label>
                <input
                    id="recuperar-confirmar"
                    type={ver ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repite la contraseña"
                    value={confirmar}
                    onChange={(e) => onChangeConfirmar(e.target.value)}
                    aria-invalid={!!errores.confirmar}
                    className={claseInput(errores.confirmar)}
                />
                {errores.confirmar && <p className="text-sm text-red-600">{errores.confirmar}</p>}
            </div>

            <Button type="submit" variant="warning" size="lg" fullWidth disabled={enviando} className="!rounded-xl">
                {enviando ? "Cambiando..." : "Cambiar contraseña"}
            </Button>
        </form>
    );
};

export default PasoNuevaContrasena;
