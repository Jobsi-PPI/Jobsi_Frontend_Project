import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiShield, FiLogOut, FiChevronRight } from "react-icons/fi";

import { usePerfil } from "../perfil/hooks/usePerfil.js";
import { useCerrarSesion } from "../../auth/hooks/useCerrarSesion.js";

// Seguridad y privacidad aún no tienen ruta: sus botones no hacen nada
const ITEMS = [
    { id: "perfil",     label: "Perfil",     descripcion: "Nombre, celular y foto",         icon: <FiUser />,   ruta: "/configuracion/perfil" },
    { id: "seguridad",  label: "Seguridad",  descripcion: "Contraseña y sesiones",          icon: <FiLock /> },
    { id: "privacidad", label: "Privacidad", descripcion: "Visibilidad y notificaciones",   icon: <FiShield /> },
];

const ConfigContent = () => {
    const navigate = useNavigate();
    const { datos } = usePerfil();
    const cerrarSesion = useCerrarSesion();

    return (
        <>
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4">

                <div className="flex items-center px-6 py-3 gap-4 min-h-24 bg-white rounded-3xl">
                    <div className="w-15 h-15 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-2xl font-bold select-none flex-shrink-0">
                        {datos.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-xl font-bold text-gray-900">{datos.nombreCompleto}</p>
                        <p className="text-sm text-gray-500">{datos.correo}</p>
                    </div>
                </div>

                {/* Botones: en móvil una sola tarjeta con filas separadas, en escritorio tres tarjetas */}
                <nav className="overflow-hidden rounded-3xl bg-white md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:bg-transparent">
                    {ITEMS.map(({ id, label, descripcion, icon, ruta }) => (
                        <div key={id} className="max-md:border-t max-md:border-gray-100 max-md:first:border-t-0 md:rounded-3xl md:bg-white">
                            {/* Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades */}
                            <button
                                type="button"
                                onClick={ruta ? () => navigate(ruta) : undefined}
                                className="flex w-full items-center gap-4 !rounded-none !border-0 !bg-transparent !p-4 text-left transition hover:!bg-gray-50 md:!rounded-3xl md:!p-5"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6ecfb] text-xl text-[#1e3a8a]">
                                    {icon}
                                </span>

                                <span className="min-w-0 flex-1">
                                    <span className="block text-base font-bold text-gray-900">{label}</span>
                                    <span className="block text-sm font-normal text-gray-500">{descripcion}</span>
                                </span>

                                <FiChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                            </button>
                        </div>
                    ))}
                </nav>

                <button type="button" onClick={cerrarSesion}
                className="flex items-center justify-center h-14 !rounded-3xl gap-3 !bg-white text-red-600">
                    <FiLogOut className="h-5 w-5 -scale-x-100" />
                    Cerrar sesión
                </button>
            </div>
        </>
    );
};

export default ConfigContent;
