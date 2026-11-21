import { Link } from "react-router-dom";

import Button from "../../../../components/ui/Button.jsx";

const PasoCorreo = ({ correo, onChange, error, enviando, onSubmit }) => (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div>
            <h2 className="text-3xl font-bold text-black md:text-4xl">¿Olvidaste tu contraseña?</h2>
            <p className="mt-2 text-gray-600 md:text-lg">
                Escribe tu correo institucional y te enviamos un código de verificación.
            </p>
        </div>

        <div className="flex flex-col gap-1.5">
            <label htmlFor="recuperar-correo" className="text-sm font-bold text-black">Correo institucional</label>
            <input
                id="recuperar-correo"
                type="email"
                autoComplete="email"
                placeholder="nombre@elpoli.edu.co"
                value={correo}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={!!error}
                className={`h-13 w-full rounded-xl border bg-white px-4 text-base text-black outline-none transition focus-visible:ring-2 focus-visible:ring-[#1e3a8a]/30
                    ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <Button type="submit" variant="warning" size="lg" fullWidth disabled={enviando} className="!rounded-xl">
            {enviando ? "Enviando..." : "Enviar código"}
        </Button>

        <Link to="/login" className="text-center font-semibold !text-[#1e3a8a] hover:underline md:hidden">
            Volver a iniciar sesión
        </Link>
    </form>
);

export default PasoCorreo;
