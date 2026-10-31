import { useState } from "react";
import { FiUser, FiLock, FiShield, FiTool, FiLogOut, FiChevronRight } from "react-icons/fi";

import { useAuth } from "../../../context/AuthContext";
import { usePerfil } from "../perfil/hooks/usePerfil.js";
import { useCerrarSesion } from "../../auth/hooks/useCerrarSesion.js";


/* Componentes*/
import Perfil from "../perfil/Perfil.jsx";

const ITEMS = [
    { id: "perfil",     label: "Perfil",     descripcion: "Nombre, celular y foto",         icon: <FiUser /> },
    { id: "seguridad",  label: "Seguridad",  descripcion: "Contraseña y sesiones",          icon: <FiLock /> },
    { id: "privacidad", label: "Privacidad", descripcion: "Visibilidad y notificaciones",   icon: <FiShield /> },
];

const ProximamenteSeccion = ({ titulo }) => (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
        <FiTool size={40} className="text-[#1e3a8a]" />
        <p className="text-lg font-semibold">{titulo}</p>
        <p className="text-sm">Esta sección estará disponible próximamente.</p>
    </div>
);

const ConfigContent = () => {
    const { user } = useAuth();
    const [seccionActiva, setSeccionActiva] = useState("perfil");
    const { perfil } = usePerfil();
    const cerrarSesion = useCerrarSesion();

    const nombre = [perfil?.nombre, perfil?.primerApellido, perfil?.segundoApellido].filter(Boolean).join(" ") || user?.nombre || "—";
    const correo = perfil?.correo ?? user?.email ?? "—";

    const renderSeccion = () => {
        switch (seccionActiva) {
            case "perfil":     return <Perfil />;
            case "seguridad":  return <ProximamenteSeccion titulo="Seguridad" />;
            case "privacidad": return <ProximamenteSeccion titulo="Privacidad" />;
            default:           return null;
        }
    };

    return (
        <>
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4">

                <div className="flex items-center px-6 py-3 gap-4 min-h-24 bg-white rounded-3xl">
                    <div className="w-15 h-15 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-2xl font-bold select-none flex-shrink-0">
                        {nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-xl font-bold text-gray-900">{nombre}</p>
                        <p className="text-sm text-gray-500">{correo}</p>
                    </div>
                </div>

                {/* Botones: en móvil una sola tarjeta con filas separadas, en escritorio tres tarjetas */}
                <nav className="overflow-hidden rounded-3xl bg-white md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:bg-transparent">
                    {ITEMS.map(({ id, label, descripcion, icon }) => (
                        <div key={id} className="max-md:border-t max-md:border-gray-100 max-md:first:border-t-0 md:rounded-3xl md:bg-white">
                            {/* Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades */}
                            <button
                                type="button"
                                onClick={() => setSeccionActiva(id)}
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


                {/* Sección activa */}
                {/* <div className="flex-1 min-w-0">
                    {renderSeccion()}
                </div> */}
            </div>
        </>
    );
};

export default ConfigContent;
