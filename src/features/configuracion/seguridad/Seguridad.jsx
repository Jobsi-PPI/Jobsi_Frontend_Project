import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";

import { useSeguridad } from "./hooks/useSeguridad";
import { usePerfil } from "../perfil/hooks/usePerfil.js";
import { useModalState } from "../../../components/ui/modals/hooks/useModalState.js";

import ConfigLayout from "../components/ConfigLayout.jsx";
import Button from "../../../components/ui/Button.jsx";
import ComingSoonModal from "../../../components/ui/modals/ComingSoonModal.jsx";

const Campo = ({ label, placeholder, value, onChange, error, autoComplete }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-900">{label}</label>
        <input
            type="password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={!!error}
            className={`h-13 w-full rounded-xl border bg-white px-4 text-base text-gray-900 outline-none transition focus-visible:ring-2 focus-visible:ring-[#1e3a8a]/30
                ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

const FilaSesion = ({ icono, iconoClassName, titulo, descripcion, children }) => (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 md:flex-row md:items-center md:gap-4 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-gray-100">
        <div className="flex min-w-0 flex-1 items-center gap-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${iconoClassName}`}>
                {icono}
            </span>
            <div className="min-w-0">
                <p className="text-base font-bold text-gray-900">{titulo}</p>
                <p className="break-words text-sm text-gray-500">{descripcion}</p>
            </div>
        </div>
        {children}
    </div>
);

const Seguridad = () => {
    const navigate = useNavigate();
    const { campos, errores, enviando, setCampo, handleSubmit } = useSeguridad();
    const { datos } = usePerfil();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    return (
        <>
            <ConfigLayout titulo="Seguridad" onVolver={() => navigate("/configuracion")}>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4">

                    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-5 md:p-6">
                        <h3 className="text-lg font-bold text-gray-900">Cambiar contraseña</h3>
                        <p className="text-sm text-gray-500">Usa al menos 8 caracteres.</p>

                        <div className="mt-4 flex flex-col gap-4">
                            <Campo label="Contraseña actual" placeholder="Tu contraseña actual" autoComplete="current-password"
                                value={campos.actual} onChange={setCampo("actual")} error={errores.actual} />

                            <div className="grid gap-4 md:grid-cols-2">
                                <Campo label="Nueva contraseña" placeholder="Mínimo 8 caracteres" autoComplete="new-password"
                                    value={campos.nueva} onChange={setCampo("nueva")} error={errores.nueva} />
                                <Campo label="Confirmar contraseña" placeholder="Repite la contraseña" autoComplete="new-password"
                                    value={campos.confirmar} onChange={setCampo("confirmar")} error={errores.confirmar} />
                            </div>
                        </div>

                        <div className="mt-5 flex md:justify-end">
                            <Button type="submit" variant="primary" size="lg" disabled={enviando} className="max-md:w-full">
                                {enviando ? "Actualizando..." : "Actualizar contraseña"}
                            </Button>
                        </div>
                    </form>

                    {/* Provisional: los botones abren "Próximamente" hasta que el backend soporte Google y las sesiones */}
                    <div className="rounded-3xl bg-white p-5 md:p-6">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Inicio de sesión</h3>

                        <FilaSesion
                            icono={<FcGoogle />}
                            iconoClassName="border border-gray-200 bg-white"
                            titulo="Cuenta de Google"
                            descripcion={`Conectada · ${datos.correo}`}
                        >
                            <button type="button" onClick={openModal}
                                className="h-11 self-start !rounded-xl !border !border-gray-300 !bg-white !px-5 text-sm font-semibold !text-gray-700 transition hover:!bg-gray-50 md:self-auto">
                                Desconectar
                            </button>
                        </FilaSesion>

                        <FilaSesion
                            icono={<FiLogOut className="-scale-x-100" />}
                            iconoClassName="bg-red-50 text-red-600"
                            titulo="Cerrar sesión en otros dispositivos"
                            descripcion="Mantienes la sesión solo en este dispositivo."
                        >
                            <button type="button" onClick={openModal}
                                className="h-11 self-start !rounded-xl !border !border-red-200 !bg-white !px-5 text-sm font-semibold !text-red-600 transition hover:!bg-red-50 md:self-auto">
                                Cerrar sesiones
                            </button>
                        </FilaSesion>
                    </div>
                </div>
            </ConfigLayout>

            <ComingSoonModal
                isOpen={isOpen}
                onClose={closeModal}
                closing={closing}
                opening={opening}
                primaryAction={{ label: "Entendido", onClick: closeModal }}
            />
        </>
    );
};

export default Seguridad;
